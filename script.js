/**
* On clicking of an appropriate type of hyperlink
* create a modal and fill it in the appropriate positive/negative story details
*/
function trigger_modal_story(elem, i) {
let e = elem.srcElement
let id = e.getAttribute('id')

const story_id = id.substr(id.length - 1)
const story_key = e.getAttribute('data-bs-target').substr(1)
fill_story(story_key, data_stories[story_id][story_key])
}

function fill_story(pos_neg, txt) {
const txt_container = document.querySelector(`.modal-story-${pos_neg}`)
txt_container.innerHTML = `<h3>${txt}</h3>`
}

// add a click event to all the hyperlinks that triggers a modal
document.querySelectorAll('a.trigger-modal').forEach((elem, i) => {
elem.addEventListener('click', trigger_modal_story, i)
})

// list of data stories that has a positive & negative combos
const data_stories = [
{
  'positive': 'diversity is a strength of the U.S. military, and our experience as senior defence leaders tells us that capable and diverse teams are more effective in today\'s environment.',
  'negative': 'Following multiple federal lawsuits, the Marine Corps now has an initiative to integrate women into every occupation specialty'
},
{
  'positive': '<p>Beth was a logistics officer volunteerly deployed in Afghanisthan on a female engagement team (FET).</p><p> Her role within the Green Barrett team was to interact with women and their households to gather information about whether the village contained residents who might support an internal defence force. Her position as a woman as "an invaluable tool" when it came to collecting information in the military.</p>',
  'negative': 'Edith, deployed as a supply clerk, saw the army as a more meritocratic workplace than the civilian jobs he had in the US South where she always felt looked down upon. She also wanted to disprove the stereotypes she had encountered growing up as a young woman of color from a poor background that, in her words, "being a Hispanic female, I wouldn\'t do much."',
},
{
  'positive': 'Gender integration happened through conservative gender expectations that women are "natural" caregivers and more emotionally equipped than their male counterparts to calm and quiet the victims of a night raid or extract valuable intelligence. Deeply seated conservative gender regimes remain within military culture even as women have recently become officially included in all military professions.',
  'negative': 'A few years after Beth had this experience, when the combat ban was rescinded, the Marine Corps sought official exemption from having to include women in infantry units, even going so far to conduct its own study, later condemned for biases in methodology and analysis favoring men, that claimed to show all-male infantry units were superior to mixed-gender units in areas such as speed, weapons accuracy, and evacuation ability. Even after the request for exemption from gender integration was denied, the Marine Corp continued to fight gender integration by elevating infantry standards and maintain separate boot camps.'
},
{
  'positive': 'The 2010 reforms opened access for veterans who could not make this connection by allowing deployment to a combat zone in any capacity not just combat roles to serve in place of what was before a requirement to prove a specific "event" caused one\'s PTSD',
  'negative': 'Although the reforms did not extend to PTSD claims in which the cause of PTSD is sexual assault. Sexual assault is not a qualifying reason to receive disability benefits; rather, the veteran must prove their PTSD or other health condition was caused or worsened by the assault.',
},
{
  'negative': 'Veteran advocacy groups continue to note in documentation as recent as 2022 the persistent myth among medical service providers that "women do not serve in combat." This translates into higher denial rates of post-traumatic stress disorder (PTSD) diagnosis for women and is thus a barrier to accessing treatment and services.'
},
{
  'positive': 'The Department of Defense hired RAND National Defense Research Institute to conduct an independent assessment of sexual assault, sexual harassment, and gender discrimination to improve DoD\'s reporting measures and procedures regarding sexual assault.',
  'negative': '<p>The 2014 RAND independent assessment found that over 20,000 service members experienced at least one sexual assault during 2014, or 1.0 percent of active-duty men and 4.9 percent of active-duty women.</p><br /><p>In addition, The RAND study also found that 10 percent of active-duty service members experienced some form of discrimination that violates the military\'s own equal opportunity program, including sexual harassment, hostile work environment, sexual quid pro quo, or gender-based derogatory comments or mistreatment (26 percent of women and 7.4 percent of men, only 0.01 percent of which were reported.</p>'
},
{
  'positive': '',
  'negative': 'In 2020, Vanessa Guillen was murdered at Fort Hood Army Base in Texas. Guillen, a twenty-year-old Army specialist, had suffered multiple incidents of sexual harassment within her company in the months leading up to another soldier bludgeoning her to death with a hammer inside an armory building. Guillen had uncovered her murderer\'s affair with another soldier, which was illegal under military fraternization rules.'
},
{
  'negative': 'The same year Guillen was murdered, the body of Sgt. Elder Fernandes, age 23, was found hanging from a tree outside of the same Fort Hood installation. Fernandes killed himself after he was sexually assaulted by his sergeant, reported the offense, and was retaliated against instead of believed or assisted.'
},
{
  'negative': 'Pvt. Ana Fernanda Basaldua Ruiz was found dead, also at Fort Hood, in March 2023. Basaldua had also told her family she was being sexually harassed by a superior before her death.'
}
]