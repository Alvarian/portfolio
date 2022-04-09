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

                Window.games[`${ title }`](appContainer);

                projectModal.style.display = "block";
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