document.addEventListener("DOMContentLoaded", function() {
    // Initial load
    updateAllContent();

    // Previous button click event
    document.getElementById('prev-button').addEventListener('click', function(event) {
        event.preventDefault();
        updateImages(-1);
    });

    // Next button click event
    document.getElementById('next-button').addEventListener('click', function(event) {
        event.preventDefault();
        updateImages(1);
    });

    function updateImages(direction) {
        // Loop through all image sections
        for (let i = 1; i <= 3; i++) {
            let imgElement = document.getElementById(`img${i}`);
            let currentSrc = imgElement.querySelector('img').getAttribute('src');
            let currentId = currentSrc.split('/')[1].split('.')[0].slice(3); // Extracts the id from "pic01.jpg" and removes "pic"

            // Calculate next image ID
            let nextId = parseInt(currentId) + direction;
            if (nextId < 1 || nextId > 99) { // Adjust the range based on your actual IDs
                return; // Exit if out of bounds
            }

            // Construct next image source
            let nextSrc = `images/pic${nextId.toString().padStart(2, '0')}.jpg`;

            // Update image source
            imgElement.querySelector('img').setAttribute('src', nextSrc);
        }

        // Update all content based on the current images
        updateAllContent();
    }

    function updateAllContent() {
        // Loop through all image sections
        for (let i = 1; i <= 3; i++) {
            let imgElement = document.getElementById(`img${i}`);
            let imgSrc = imgElement.querySelector('img').getAttribute('src');
            let imgId = imgSrc.split('/')[1].split('.')[0].slice(3); // Extracts the id from "pic01.jpg" and removes "pic"

            // Fetch JSON data
            fetch(`https://papuanationalschool.xyz/data/${imgId}/show`,{
                headers: {
                    'x-api-key': "Galau-xyeik49w8ncw8jq"
                }
            })
                .then(response => response.json())
                .then(data => {
                    // Update title and description
                    document.getElementById(`t${i}`).textContent = data.title;
                    document.getElementById(`dec${i}`).textContent = data.dec;
                })
                .catch(error => {
                    console.error('Error fetching JSON:', error);
                });
        }
    }
});
