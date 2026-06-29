import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Use the custom firestoreDatabaseId if provided, otherwise default
const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Validate Connection on startup as required by firebase-integration instructions
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error: any) {
    // Treat as warning instead of a blocking error, as the user's database might be newly created or restricted by Firestore rules
    console.debug("Firestore connection check info:", error?.message || error);
  }
}
testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const code = (error as any)?.code || '';
  const defaultMsg = `Không thể ${operationType} dữ liệu${path ? ` tại ${path}` : ''}. Vui lòng thử lại sau.`;
  const message = error instanceof Error ? error.message : String(error);

  const errInfo: FirestoreErrorInfo = {
    error: message,
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error:', code, message);
  throw new Error(defaultMsg);
}

export function getFriendlyAuthErrorMessage(error: any): string {
  if (!error) return 'Đã xảy ra lỗi không xác định.';
  const code = error.code || '';
  const message = error.message || '';

  switch (code) {
    case 'auth/configuration-not-found':
      return 'Dự án Firebase của bạn chưa kích hoạt tính năng Xác thực. Vui lòng truy cập Firebase Console cho dự án "omnifate-6868" -> vào mục "Authentication" -> bấm "Get Started" và kích hoạt phương thức đăng nhập bằng "Email/Password".';
    case 'auth/invalid-credential':
      return 'Email hoặc mật khẩu không đúng. Vui lòng kiểm tra lại thông tin đăng nhập.';
    case 'auth/wrong-password':
      return 'Mật khẩu không chính xác. Vui lòng kiểm tra và nhập lại.';
    case 'auth/user-not-found':
      return 'Tài khoản email này chưa được đăng ký trên hệ thống.';
    case 'auth/email-already-in-use':
      return 'Email này đã được sử dụng bởi một tài khoản khác.';
    case 'auth/invalid-email':
      return 'Địa chỉ email không đúng định dạng (Ví dụ: ten@example.com).';
    case 'auth/weak-password':
      return 'Mật khẩu quá yếu. Vui lòng sử dụng mật khẩu mạnh hơn (tối thiểu 6 ký tự).';
    case 'auth/too-many-requests':
      return 'Tài khoản tạm thời bị khóa do nhập sai nhiều lần liên tiếp. Vui lòng quay lại sau ít phút.';
    case 'auth/user-disabled':
      return 'Tài khoản này đã bị tạm ngưng hoặc vô hiệu hóa bởi quản trị viên.';
    case 'auth/operation-not-allowed':
      return 'Phương thức đăng ký/đăng nhập này hiện chưa được hỗ trợ.';
    case 'auth/network-request-failed':
      return 'Lỗi kết nối mạng. Vui lòng kiểm tra lại đường truyền internet của bạn.';
    default:
      // Fallback for custom or unmapped errors
      if (message.includes('invalid-credential')) {
        return 'Email hoặc mật khẩu không đúng. Vui lòng kiểm tra lại thông tin.';
      }
      return message || 'Đã xảy ra sự cố trong quá trình xác thực. Vui lòng thử lại.';
  }
}

export { app, auth, db };

