'use client';

import { createContext, useContext } from 'react';

export interface AdminAuthState {
  token:  string | null;
  userId: string | null;
}

export const AdminAuthContext = createContext<AdminAuthState>({
  token:  null,
  userId: null,
});

export function useAdminAuth(): AdminAuthState {
  return useContext(AdminAuthContext);
}
