// Uso: node tools/cifrar-formulario.mjs "CODIGO FAMILIAR" "ID_DEL_GOOGLE_FORM"
// Imprime los atributos data-* para el <form data-code-gate> de dist/inscripcion.html.
// El código nunca se guarda en el repo: solo el ID cifrado con una clave derivada del código.
import { webcrypto as crypto } from 'node:crypto';

const ITERATIONS = 150000;

const normalizeCode = (value) =>
  value.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z0-9]/g, '');

const [rawCode, formId] = process.argv.slice(2);
if (!rawCode || !formId) {
  console.error('Uso: node tools/cifrar-formulario.mjs "CODIGO FAMILIAR" "ID_DEL_GOOGLE_FORM"');
  process.exit(1);
}

const code = normalizeCode(rawCode);
const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));
const material = await crypto.subtle.importKey('raw', new TextEncoder().encode(code), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
  material,
  { name: 'AES-GCM', length: 256 },
  false,
  ['encrypt'],
);
const cipher = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(formId)));
const b64 = (bytes) => Buffer.from(bytes).toString('base64');

console.log(`Código normalizado: ${code}`);
console.log(`data-iterations="${ITERATIONS}" data-salt="${b64(salt)}" data-iv="${b64(iv)}" data-cipher="${b64(cipher)}"`);
