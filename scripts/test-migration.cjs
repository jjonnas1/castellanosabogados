const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const filename = path.resolve('lib/migration-engine.ts');
const compiled = ts.transpileModule(fs.readFileSync(filename,'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const mod = new Module(filename,module);mod.filename=filename;mod.paths=module.paths;mod._compile(compiled,filename);
const {evaluateMigration} = mod.exports;
const base={location:'colombia',nationality:'other',status:'entry',valid:'yes',soon:'no',refuge:'no',decision:'none'};
function interview(overrides={}) {
  const desired={...base,...overrides};const answers={};
  for(let i=0;i<60;i++) {
    const response=evaluateMigration(answers);
    if(response.result)return {...response,answers};
    const q=response.question;const v=desired[q.id]??(q.options.some(o=>o.value==='yes')?'yes':q.options[0].value);
    assert.ok(q.options.some(o=>o.value===v),`Opción inválida para ${q.id}`);answers[q.id]=v;
  }
  throw new Error('Ruta sin salida');
}
const tests=[
 ['Duración de estudios desconocida queda pendiente',()=>{const {result:r}=interview({purpose:'study',studyLong:'unknown'});assert.equal(r.status,'pending')}],
 ['Fecha de vencimiento sin confirmar queda pendiente',()=>{const {result:r}=interview({purpose:'remote',soon:'unknown'});assert.equal(r.status,'pending')}],
 ['Nómada con soportes',()=>{const {result:r}=interview({purpose:'remote'});assert.match(r.title,/nómada/);assert.equal(r.status,'review');assert.match(r.limits,/No autoriza trabajar/)}],
 ['Nómada con cliente colombiano',()=>{const {result:r}=interview({purpose:'remote',foreignOnly:'no'});assert.equal(r.status,'pending');assert.ok(r.missing.some(x=>x.includes('exterior')))}],
 ['Permiso vencido prioriza Migración',()=>{const {result:r}=interview({purpose:'stay',valid:'no'});assert.equal(r.status,'priority');assert.ok(r.alerts.some(x=>x.includes('prórroga retroactiva')));assert.ok(!r.alerts.some(x=>x.includes('artículo 111')))}],
 ['Visa vencida diferencia 30 días',()=>{const {result:r}=interview({purpose:'family',status:'visa',valid:'no',change:'none'});assert.ok(r.alerts.some(x=>x.includes('artículo 111')))}],
 ['Divorcio antes del vencimiento',()=>{const {result:r}=interview({purpose:'family',status:'visa',change:'family',cohabitation:'no'});assert.equal(r.status,'priority');assert.ok(r.missing.some(x=>x.includes('convivencia')))}],
 ['Refugio pendiente bloquea vía ordinaria',()=>{const {result:r}=interview({purpose:'work',refuge:'yes'});assert.ok(r.alerts.some(x=>x.includes('refugio pendiente')))}],
 ['Cancelación obliga estudio previo',()=>{const {result:r}=interview({purpose:'pension',decision:'cancellation'});assert.equal(r.status,'priority');assert.ok(r.alerts.some(x=>x.includes('detener radicación')))}],
 ['Peruano compara Andino',()=>{const {result:r}=interview({purpose:'work',nationality:'andean'});assert.ok(r.alternatives.some(x=>x.includes('Andino')))}],
 ['Boliviano compara tratados',()=>{const {result:r}=interview({purpose:'treaty',nationality:'bolivia'});assert.match(r.title,/Andino/);assert.ok(r.alternatives.some(x=>x.includes('Mercosur')))}],
 ['Nacionalidad sin tratado no pasa',()=>{const {result:r}=interview({purpose:'treaty'});assert.equal(r.status,'pending');assert.match(r.title,/No hay/)}],
 ['Unión menor a un año',()=>{const {result:r}=interview({purpose:'family',familyKind:'partner',unionYear:'no'});assert.equal(r.status,'pending');assert.ok(r.missing.some(x=>x.includes('un año')))}],
 ['Pensión no vitalicia',()=>{const {result:r}=interview({purpose:'pension',lifetime:'no'});assert.equal(r.status,'pending');assert.ok(r.alternatives.some(x=>x.includes('rentista')))}],
 ['Inversión solo proyectada',()=>{const {result:r}=interview({purpose:'investment',investmentKind:'none'});assert.equal(r.status,'pending');assert.ok(r.missing.some(x=>x.includes('estructurar')))}],
 ['Visitante no acumula residencia M',()=>{const {result:r}=interview({purpose:'resident',residentCategory:'visitor'});assert.equal(r.status,'pending');assert.ok(r.missing.some(x=>x.includes('visitante')))}],
 ['Residencia con intervalo',()=>{const {result:r}=interview({purpose:'resident',continuity:'no'});assert.equal(r.status,'pending')}],
 ['Protección venezolana exige vigencia',()=>{const {result:r}=interview({purpose:'special',nationality:'venezuela',ppt:'no'});assert.ok(r.missing.some(x=>x.includes('protección temporal vigente')))}],
 ['Por confirmar no equivale a sí',()=>{const {result:r}=interview({purpose:'remote',income3:'unknown'});assert.equal(r.status,'pending');assert.ok(r.missing.some(x=>x.startsWith('Por confirmar')))}],
 ['Se descartan respuestas de ramas previas',()=>{const old=interview({purpose:'remote',foreignOnly:'no'});const changed=evaluateMigration({...old.answers,purpose:'pension'});assert.equal(changed.question.id,'lifetime');assert.ok(!changed.history.some(x=>x.id==='foreignOnly'))}],
 ['Valores inválidos no se aceptan',()=>{const r=evaluateMigration({location:'invalid'});assert.equal(r.question.id,'location');assert.equal(r.history.length,0)}],
 ['Todas las rutas terminan',()=>{for(const purpose of ['stay','treaty','family','remote','work','pension','investment','study','resident','dependent','special'])assert.ok(interview({purpose}).result)}],
];
for(const [name,test] of tests){test();console.log(`✓ ${name}`)}
console.log(`${tests.length} comprobaciones correctas.`);
