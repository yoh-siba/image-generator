export function checkPassword(password: string): boolean {
  return password === process.env.APP_PASSWORD;
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('authenticated') === 'true';
}

export function setAuthenticated(value: boolean): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('authenticated', value.toString());
}

export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('authenticated');
}