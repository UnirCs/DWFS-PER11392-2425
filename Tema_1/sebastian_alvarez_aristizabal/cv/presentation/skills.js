var CONFIG = '';
export function buildSkills(config){

    CONFIG = config;

    document.getElementById('skillsContainerTitle').innerText = config.skills.title;

    let skills = '';

    for(var i = 0; i < config.skills.skillsInfo.length; i++){
        skills += _buildSkill(config.skills.skillsInfo[i]);
    }

    document.getElementById('skillsContainerList').innerHTML = skills;

}

function _buildSkill(skill){

    let skillsLevelList = _buildSkillLevelList(skill.level);

    return  `
       <li class="skill__item">
                    <p class="skill__item__title">${skill.title}</p>
                    <ul class="skills_container__level">
                        ${skillsLevelList}
                    </ul>
        </li> `
    
}

function _buildSkillLevelList(level){
    let skillsLevelList = '';

    for( var i = 0;  i < CONFIG.skills.maxLevel ; i++){
        if(i < level) {
            skillsLevelList += '<li class="skill-level__item skill_level_checked"></li>'
        }
        else{
        skillsLevelList += '<li class="skill-level__item"></li>' }
    }

    return skillsLevelList;
}