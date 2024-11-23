import { ApiService } from "..";

import { setCookie, getCookie } from "cookies-next";

class AuthService extends ApiService {
  async generateOtpCode(phoneNumber = "") {
    try {
      const res = await this.axios({
        method: "POST",
        url: this.endpoints.auth.generateOTP,
        params: { phoneNumber },
      });

      if (res.data.success && this.isDevelopmentEnvironment) {
        setCookie("OTP", res.data.contentList[0].otpToken);
      }

      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async validateOtpCode(request) {
    const { phoneNumber, otp } = request;
    try {
      const res = await this.axios({
        method: "POST",
        url: this.endpoints.auth.validateOTP,
        params: { phoneNumber, otptoken: otp },
      });

      if (res.data.success) {
        setCookie("token", res.data.contentList?.[0]);
      }

      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async signUp(request) {
    const { phoneNumber } = request;

    try {
      return await this.generateOtpCode(phoneNumber);
    } catch (error) {
      throw error;
    }
  }

  async signIn(request) {
    const { phoneNumber, otp } = request;
    return await this.validateOtpCode({ phoneNumber, otp });
  }

  async signOut() {
    try {
      const res = await this.axios({
        method: "POST",
        url: this.endpoints.auth.logout,
        headers: {
          Authorization: getCookie("token"),
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

// class AuthApi {
//   async signIn(request) {
//     const { email, password } = request;

//     await wait(500);

//     return new Promise((resolve, reject) => {
//       try {
//         // Find the user
//         const user = users.find((user) => user.email === email);

//         if (!user || (user.password !== password)) {
//           reject(new Error('Please check your email and password'));
//           return;
//         }

//         // Create the access token
//         const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

//         resolve({ accessToken });
//       } catch (err) {
//         console.error('[Auth Api]: ', err);
//         reject(new Error('Internal server error'));
//       }
//     });
//   }

//   async signUp(request) {
//     const { email, name, password } = request;

//     await wait(1000);

//     return new Promise((resolve, reject) => {
//       try {
//         // Check if a user already exists
//         let user = users.find((user) => user.email === email);

//         if (user) {
//           reject(new Error('User already exists'));
//           return;
//         }

//         user = {
//           id: createResourceId(),
//           avatar: undefined,
//           email,
//           name,
//           password,
//           plan: 'Standard'
//         };

//         users.push(user);

//         const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

//         resolve({ accessToken });
//       } catch (err) {
//         console.error('[Auth Api]: ', err);
//         reject(new Error('Internal server error'));
//       }
//     });
//   }

//   me(request) {
//     const { accessToken } = request;

//     return new Promise((resolve, reject) => {
//       try {
//         // Decode access token
//         const { userId } = decode(accessToken);

//         // Find the user
//         const user = users.find((user) => user.id === userId);

//         if (!user) {
//           reject(new Error('Invalid authorization token'));
//           return;
//         }

//         resolve({
//           id: user.id,
//           avatar: user.avatar,
//           email: user.email,
//           name: user.name,
//           plan: user.plan
//         });
//       } catch (err) {
//         console.error('[Auth Api]: ', err);
//         reject(new Error('Internal server error'));
//       }
//     });
//   }
// }

export const authService = new AuthService();
