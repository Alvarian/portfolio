import { throttle, debounce } from "lodash";
import { AES, enc } from "crypto-js";


function decryptAndEvaluateCode(unevaluatedEncryptedCode, Securitykey) {
    // the decipher function
    const decryptedData = AES.decrypt(unevaluatedEncryptedCode, Securitykey).toString(enc.Utf8);;

    eval(decryptedData);
}

Window.lib = { 
    throttle, 
    debounce,
    decryptAndEvaluateCode
};