import { NextResponse } from "next/server";
import { paths } from "./paths";
import { ENDPOINTS, PISTON_INSTANCE } from "./api";

const checkValidToken = async (token) => {
  try {
    if (!token) return false;

    const res = await PISTON_INSTANCE({
      method: "GET",
      url: ENDPOINTS.users.me.read,
      headers: {
        Authorization: token,
      },
    });

    return res.data;
  } catch (error) {
    return false;
  }
};

export default async function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const isValidToken = await checkValidToken(token);

  if (!isValidToken) {
    return NextResponse.redirect(new URL(paths.index, req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
