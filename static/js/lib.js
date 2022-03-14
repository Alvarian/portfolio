import { throttle, debounce } from "lodash";
import { createDecipheriv } from "crypto";


function decryptAndEvaluateCode(unevaluatedEncryptedCode, Securitykey, initVector) {
    // the decipher function
    const decipher = createDecipheriv("aes-256-cbc", Securitykey, initVector);

    let decryptedData = decipher.update(unevaluatedEncryptedCode, "hex", "utf-8");

    decryptedData += decipher.final("utf8");

    return eval(decryptedData);
}

Window.lib = { 
    throttle, 
    debounce,
    decryptAndEvaluateCode
};