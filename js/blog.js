window.onload = function () {
    fetch('https://www.googleapis.com/blogger/v3/blogs/7090392525208537563/posts?key=AIzaSyD5dD55I9lEVPKAa5Gr_HcnpZIkhqdpXj0')
        .then(response => response.json())
        .then(data => {
           // console.log(data);
            if (!data.items) {
                console.error('No items found in data');
                return; // Exit if no items found
            }
            const publicationItems = data.items.filter(item => item.labels && item.labels.includes('Publications'));

            const populatePublicationElement = document.getElementById('populate-Publications');
            if (!populatePublicationElement) {
                console.error('Element #populate-Publications not found');
                return; // Exit if the element is not found
            }






            publicationItems.forEach(item => {
              // Function to format the date
// Assuming formatDate is your function from before
function formatDate(dateString) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const date = new Date(dateString);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let daySuffix;
    switch (dayOfMonth) {
        case 1: case 21: case 31: daySuffix = "st"; break;
        case 2: case 22: daySuffix = "nd"; break;
        case 3: case 23: daySuffix = "rd"; break;
        default: daySuffix = "th";
    }

    return `${dayOfWeek}., ${dayOfMonth}${daySuffix} ${month}., ${year}`;
};
                const src = item.content.match(/<img[^>]*src="([^"]*)"/)?.[1];
                if (!src) {
                    console.warn('Image source not found for item:', item.id);
                    // Consider handling items without images differently
                }

              
                
                populatePublicationElement.innerHTML += `<div data-aos=" " class="bg-gray-100 shadow-lg w-full rounded-lg mb-3">
                    <div class="md:w-full overflow-hidden rounded-t">
                 
                      <img src="${src}" alt="${item.title}" class="w-full h-full object-cover object-center  border border-b-0 ">
                    </div> 
                    <div class="px-5 text-center pt-10">
                      <h3 class="text-base md:text-2xl font-bold tracking-tight uppercase"> ${item.title} </h3>
                       <p class="text-sm md:text-lg font-semibold my-6 text-gray-600"> <i class="fas fa-calendar"></i>${formatDate(item.published.split('T')[0])}</p>
                     <p class="text-sm mb-8 md:text-2xl tracking-tight "> ${item.content.replace(/<[^>]+>/g, '').split(' ').slice(0, 20).join(' ')} ... </p>
                     <a href="https://buklawclinic.com.ng/single.html?id=${item.id}" class=""> <p class="text-sm button py-3 md:text-2xl bg-red-700 text-white  mb-5 font-semibold">Read Full » </p> </a> 
                    </div>
                </div>`;
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};


