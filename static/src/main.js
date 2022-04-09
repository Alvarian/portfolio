async function loadModalContent(secretKey, title, version, projectType, website) {
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
    }
    document.getElementById(modalID).style.display = "none";
}