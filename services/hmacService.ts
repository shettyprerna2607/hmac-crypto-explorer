/**
 * Generates an HMAC-SHA256 hash for a given key and message.
 * This function simulates a backend service call by using the browser's
 * built-in Web Crypto API.
 * @param keyString The secret key as a string.
 * @param messageString The message to authenticate.
 * @returns A promise that resolves to the HMAC hash as a hex string.
 */
export const generateHmac = async (keyString: string, messageString: string): Promise<string> => {
  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));

  const encoder = new TextEncoder();
  const keyData = encoder.encode(keyString);
  const messageData = encoder.encode(messageString);

  // Import the key for HMAC generation
  const cryptoKey = await window.crypto.subtle.importKey(
    'raw', // raw format of the key - just the bytes
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false, // not extractable
    ['sign', 'verify'] // can be used for signing and verifying
  );

  // Generate the HMAC signature
  const signature = await window.crypto.subtle.sign(
    'HMAC',
    cryptoKey,
    messageData
  );

  // Convert the signature ArrayBuffer to a hex string
  const hashArray = Array.from(new Uint8Array(signature));
  const hexString = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hexString;
};
