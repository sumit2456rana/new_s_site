"use server";

export async function verifyKey(userKey: string) {
    // ⏳ wait 5 seconds
    await new Promise(resolve => setTimeout(resolve, 4000));
    const key = userKey.toLowerCase();
    // then return the result
    return key === process.env.SECRET_KEY;
}
