export function buildAboutMe(config){
    document.getElementById('leftSide').innerHTML += `
    <div>
    <h3 class="about-title">${config.title}</h3>
    <p class="about-info">${config.info}</p>
    </div>
    ` ;
}