export type Role = 'penyedia' | 'pengelola' | 'admin';

export interface UserAccount {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: Role;
  registeredAt?: string;
}

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: Role;
  loginAt: string;
}

export const DEMO_ACCOUNTS: UserAccount[] = [
  {
    id: 'demo-penyedia',
    email: 'fnb.operations@sahidjaya.cc',
    password: 'password123',
    name: 'Grand Sahid Jaya',
    role: 'penyedia',
    registeredAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'demo-penyedia-alias',
    email: 'penyedia@foodrescue.id',
    password: 'password123',
    name: 'Mitra Penyedia Sahid',
    role: 'penyedia',
    registeredAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'demo-pengelola',
    email: 'koordinator@berkahpangan.com',
    password: 'password123',
    name: 'Yayasan Berkah Pangan',
    role: 'pengelola',
    registeredAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'demo-pengelola-alias',
    email: 'pengelola@foodrescue.id',
    password: 'password123',
    name: 'Yayasan Berkah Pangan',
    role: 'pengelola',
    registeredAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'demo-admin',
    email: 'rafi.verifikator@foodrescue.id',
    password: 'password123',
    name: 'Rafi Pratama',
    role: 'admin',
    registeredAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: 'demo-admin-alias',
    email: 'admin@foodrescue.id',
    password: 'password123',
    name: 'Rafi Pratama',
    role: 'admin',
    registeredAt: '2024-01-01T00:00:00.000Z',
  },
];

const STORAGE_ACCOUNTS_KEY = 'foodrescue_accounts';
const STORAGE_SESSION_KEY = 'foodrescue_session';

/**
 * Mengambil daftar akun terdaftar di localStorage digabung dengan akun demo bawaan
 */
export function getStoredAccounts(): UserAccount[] {
  if (typeof window === 'undefined') return DEMO_ACCOUNTS;

  let localAccounts: UserAccount[] = [];
  try {
    const raw = localStorage.getItem(STORAGE_ACCOUNTS_KEY);
    if (raw) {
      localAccounts = JSON.parse(raw);
    }
  } catch {
    localAccounts = [];
  }

  // Cek jika ada legacy registered user
  try {
    const legacyRaw = localStorage.getItem('foodrescue_registered_user');
    if (legacyRaw) {
      const legacy = JSON.parse(legacyRaw);
      if (legacy && legacy.email) {
        const roleNormalized: Role =
          legacy.role === 'pengelola' ? 'pengelola' : legacy.role === 'admin' ? 'admin' : 'penyedia';
        const alreadyInList = localAccounts.some(
          a => a.email.toLowerCase() === legacy.email.toLowerCase()
        );
        if (!alreadyInList) {
          localAccounts.push({
            id: 'registered-' + Date.now(),
            email: legacy.email,
            password: legacy.password || 'password123',
            name: legacy.name || 'Pengguna Terdaftar',
            role: roleNormalized,
            registeredAt: legacy.registeredAt || new Date().toISOString(),
          });
        }
      }
    }
  } catch {
    // ignore
  }

  // Gabungkan dengan akun demo tanpa duplikat email
  const allAccounts: UserAccount[] = [...DEMO_ACCOUNTS];
  for (const acc of localAccounts) {
    const idx = allAccounts.findIndex(a => a.email.toLowerCase() === acc.email.toLowerCase());
    if (idx >= 0) {
      allAccounts[idx] = acc;
    } else {
      allAccounts.push(acc);
    }
  }

  return allAccounts;
}

/**
 * Menyimpan akun baru saat registrasi
 */
export function saveRegisteredAccount(data: {
  email: string;
  password?: string;
  name: string;
  role: Role;
}): UserAccount {
  const accounts = getStoredAccounts();
  const emailNorm = data.email.trim().toLowerCase();

  const newAccount: UserAccount = {
    id: 'user-' + Date.now(),
    email: emailNorm,
    password: data.password || 'password123',
    name: data.name.trim() || (data.role === 'pengelola' ? 'Pengelola Posko' : 'Mitra Penyedia'),
    role: data.role,
    registeredAt: new Date().toISOString(),
  };

  const updated = accounts.filter(a => a.email.toLowerCase() !== emailNorm);
  updated.push(newAccount);

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_ACCOUNTS_KEY, JSON.stringify(updated));
      // Simpan juga ke registered user legacy
      localStorage.setItem(
        'foodrescue_registered_user',
        JSON.stringify({
          role: data.role,
          name: newAccount.name,
          email: newAccount.email,
          password: newAccount.password,
          registeredAt: newAccount.registeredAt,
        })
      );
    } catch {
      // ignore
    }
  }

  return newAccount;
}

/**
 * Validasi login mencocokkan email dan password
 */
export function authenticateUser(
  emailInput: string,
  passwordInput: string
): { success: boolean; user?: UserAccount; error?: string } {
  const email = emailInput.trim().toLowerCase();
  const password = passwordInput.trim();

  if (!email || !password) {
    return { success: false, error: 'Email dan kata sandi wajib diisi.' };
  }

  const accounts = getStoredAccounts();
  const matched = accounts.find(a => a.email.toLowerCase() === email);

  if (!matched) {
    return {
      success: false,
      error: 'Akun dengan email ini belum terdaftar. Silakan lakukan registrasi terlebih dahulu.',
    };
  }

  // Cocokkan kata sandi (jika akun memiliki password tersimpan)
  if (matched.password && matched.password !== password) {
    return {
      success: false,
      error: 'Kata sandi yang Anda masukkan salah. Silakan coba lagi.',
    };
  }

  return { success: true, user: matched };
}

/**
 * Mendapatkan sesi aktif
 */
export function getSession(): UserSession | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_SESSION_KEY);
    if (!raw) return null;
    const session: UserSession = JSON.parse(raw);
    if (!session || !session.role) return null;
    return session;
  } catch {
    return null;
  }
}

/**
 * Menyimpan sesi login aktif
 */
export function setSession(user: UserAccount): UserSession {
  const session: UserSession = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    loginAt: new Date().toISOString(),
  };

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
      localStorage.setItem('foodrescue_active_role', user.role);
    } catch {
      // ignore
    }
  }

  return session;
}

/**
 * Menghapus sesi saat logout
 */
export function clearSession(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(STORAGE_SESSION_KEY);
      localStorage.removeItem('foodrescue_active_role');
    } catch {
      // ignore
    }
  }
}

/**
 * Mendapatkan path rute dashboard/portal berdasarkan role
 */
export function getPortalPathForRole(role: Role): string {
  switch (role) {
    case 'pengelola':
      return '/pengelola/ringkasan';
    case 'admin':
      return '/admin/verifikasi';
    case 'penyedia':
    default:
      return '/provider/ringkasan';
  }
}

