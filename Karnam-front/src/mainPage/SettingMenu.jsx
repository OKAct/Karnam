
const SettingMenu=({hidden,settingSetter})=>{
  return(
    <div className="settingMenu" hidden={hidden}>
    
    <div className="setting_upward">Setting</div>
    <div className="setting">

    <div className="settingElement" >Base URL</div>
    <input className="settingInput"  onChange={(e)=>{

      settingSetter(prev=>({
        ...prev,
        localAiBaseUrl:e.target.value
      }));
      console.log(e.target.value);
    }} />

    <div className="settingElement" >API KEY</div>
    <input className="settingInput" defaultValue="ollama" 
      onChange={(e)=>{

      settingSetter(prev=>({
        ...prev,
        apiKey:e.target.value
      }))
      console.log(e.target.value);
        
      }}
      />

    <div className="settingElement" >AI Model</div>
    <input className="settingInput" 
      onChange={(e)=>{

      settingSetter(prev=>({
        ...prev,
        aiModel:e.target.value
      }))
      console.log(e.target.value);
        }}  />

    <div className="settingElement">Temprature</div>
    <input className="settingInput" defaultValue="0.9"
      onChange={(e)=>{
      settingSetter(prev=>({
        ...prev,
        temprature:e.target.value
      }));
      console.log(e.target.value);
      }} />

    </div>
    </div>
  );
}
export default SettingMenu
