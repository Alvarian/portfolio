function _base64ToArrayBuffer(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

async function loadModalContent(secretKey, title, version, projectType, website, presentationRoot) {
    let appContainer;
    switch (projectType) {
        case "Application":
            const projectModal = document.getElementById("project_modal");
            appContainer = document.getElementById("project_model_container");
            try {
                const getCacheResponse = await fetch(`/projects/get-cache?title=${ title }&version=${ version }&projectType=${ projectType }`);
                if (!getCacheResponse.ok) throw getCacheResponse;

                const encryption = await getCacheResponse.text();
                
                decryptAndEval(secretKey, encryption);

                Window.games[title](appContainer);

                projectModal.style.display = "block";

                delete Window.games[title];
            } catch (err) {
                console.log(err)
            } finally {
                break;
            }
        case "Website":
            const webModal = document.getElementById("web_modal");
            
            appContainer = document.getElementById("web_modal_container");

            appContainer.src = website;

            webModal.style.display = "block";
            break;
        case "Presentation":
            const presentationModal = document.getElementById("presentation_modal");
            appContainer = document.getElementById("presentation_model_container");
            try {
                const getCacheResponse = await fetch(`/projects/get-slides?title=${ title }`);
                if (!getCacheResponse.ok) throw getCacheResponse;

                const listOfImageData = await getCacheResponse.json();
                
                listOfImageData.slides.forEach(slide => {
                    const img = document.createElement('img');
                    img.src = slide;
                    console.log(slide)
                    presentationModal.appendChild(img);
                });

                presentation_modal.style.display = "block";
            } catch (err) {
                console.log(err);
            } finally {
                break;
            }
        default:
            console.log(`${ projectType } not a caught modal content`);
            break;
    }
}

// When the user clicks on <span> (x), close the modal
function handleClose(modalID) {
    switch (modalID) {
        case "project_modal":
            document.getElementById("project_model_container").innerHTML = "";
            break;
        case "web_modal":
            document.getElementById("web_modal_container").src = "";
            break;
        case "presentation_modal":
            document.getElementById("presentation_model_container").innerHTML = "";
            break;
    }
    document.getElementById(modalID).style.display = "none";
}