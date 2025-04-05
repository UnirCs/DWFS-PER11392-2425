import { buildSkills } from './presentation/skills.js';
import { config } from './config/config.js';
import { buildModal } from './presentation/no-responsive-modal.js';
import { buildAboutMe } from './presentation/about-me.js';
import { buildAcademicInformation } from './presentation/academic-information.js';

main();

function main(){
    buildSkills(config);
    _buildPresentation();
    buildAboutMe(config.aboutMe);
    buildAcademicInformation(config.academicInformation);
    buildModal(config.noResponsiveModal);
}

function _buildPresentation(){
    const presentation = `
    <h2>${config.name}</h2>
    <h3 class="presentation_degree">${config.degree}</h3>
    <div class="line"></div>
    `;
    document.getElementById('leftSide').innerHTML = presentation;
}
