import msgpack from 'msgpack-lite';
import { deflate, inflate } from 'pako';

function urlBase64Encode(buffer: Buffer) {
    return buffer.toString('base64')
    .replace(/\+/g, '-').
    replace(/\//g, '_')
    .replace(/=+$/, '');
}

function urlBase64Decode(str: string) {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
        base64 += '=';
    }
    return Buffer.from(base64, 'base64');
}

export function encodeData(data: string) {
    const packedData = msgpack.encode(data);
    const compressedData = deflate(packedData);
    return urlBase64Encode(Buffer.from(compressedData));
}

export function decodeData(data: string) {
    const compressedData = urlBase64Decode(data);
    const packedData = inflate(compressedData);
    return msgpack.decode(packedData);
}