export function buildModal(config){
    document.getElementById('noResponsiveModal').innerHTML =  ` 
     <div class="no-responsive-container"> 
     <img src="${config.icon}" alt="no-responsive-img" class="no-response-img">
     <div class="no-responsive-texts">
          <h3 class="no-responsive-title"> ${config.title}</h3>
          <p class="no-responsive-content">${config.content}</p>
     </div>

     </div>
    `
}