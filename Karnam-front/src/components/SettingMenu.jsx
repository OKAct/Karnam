
const SettingMenu=({hidden})=>{
  return(
    <div className="settingMenu" hidden={hidden}>
    
    <div className="setting_upward">Setting</div>
    <div className="setting">

    <div className="settingElement" >Base URL</div>
    <input className="settingInput"/>

    <div className="settingElement" >API KEY</div>
    <input className="settingInput" defaultValue="ollama"/>

    <div className="settingElement" >AI Model</div>
    <input className="settingInput"/>

    <div className="settingElement">Temprature</div>
    <input className="settingInput" defaultValue="0.9" />

    </div>
    </div>
  );
}
export default SettingMenu
