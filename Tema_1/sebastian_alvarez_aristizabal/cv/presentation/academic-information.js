export function buildAcademicInformation(config){
    console.log(config);
    let academicItems = _buildAcademicItems(config.info);

    document.getElementById('leftSide').innerHTML += `
    <h3 class="academic-info-title">${config.title}</h3>
    ${academicItems}
    `;
}

function _buildAcademicItems(info){
    let items = '';

    for(var i=0; i< info.length; i++){
        items += `
        <div class="academic-info-item">
            <h3 class="academic-info-item__title">${info[i].title}</h3>
            <p class="academic-info-item__info">${info[i].info}</p>
            <p class="academic-info-item__end-date">${info[i].endDate}</p>
        </div>
        `;
    }

    return items;
}