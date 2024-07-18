document.addEventListener("DOMContentLoaded", function() {
    // Initial load
    updateAllContent();

    // Previous button click event
    let clicknext = 0
    document.getElementById('spprev-button').addEventListener('click', function(event) {
        event.preventDefault();
        updateImages(-1);
        if(clicknext > 0) {
            clicknext -=1;
        }
    });
    
    // Next button click event
    document.getElementById('spnext-button').addEventListener('click', function(event) {
        if(clicknext > 3){
            return
        } else{
            event.preventDefault();
            updateImages(1);
            clicknext+=1;
        }
        
    });

    function updateImages(direction) {
        // Loop through all image sections
        for (let i = 1; i <= 3; i++) {
            let imgElement = document.getElementById(`spimg${i}`);
            let currentSrc = imgElement.querySelector('img').getAttribute('src');
            let currentId = currentSrc.split('/')[2].split('.')[0].slice(3); // Extracts the id from "pic01.jpg" and removes "pic"
            
          

            // Calculate next image ID
            let nextId = parseInt(currentId) + direction;
            if (nextId < 1 || nextId > 8) { // Adjust the range based on your actual IDs
                return; // Exit if out of bounds
            }

            // Construct next image source
            let nextSrc = `images/special/pic${nextId.toString().padStart(2, '0')}.jpg`;

            // Update image source
            imgElement.querySelector('img').setAttribute('src', nextSrc);
        }

        // Update all content based on the current images
        updateAllContent();
    }

    function updateAllContent() {
        // Loop through all image sections
        for (let i = 1; i <= 3; i++) {
            let imgElement = document.getElementById(`spimg${i}`);
            let imgSrc = imgElement.querySelector('img').getAttribute('src');
            let imgId = imgSrc.split('/')[2].split('.')[0].slice(3); // Extracts the id from "pic01.jpg" and removes "pic"

            // Fetch JSON data
            fetch(`https://papuanationalschool.xyz/data/sp/${imgId}/show`,{
                headers: {
                    'x-api-key': "Galau-xyeik49w8ncw8jq"
                }
            })
                .then(response => response.json())
                .then(data => {
                    // Update title and description
                    document.getElementById(`spt${i}`).textContent = data.title;
                    document.getElementById(`spdec${i}`).textContent = data.dec;
                })
                .catch(error => {
                    console.error('Error fetching JSON:', error);
                });
        }
    }
});
