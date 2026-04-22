import { useState, useEffect, useRef } from "react";

const makeTheme = (dark) => dark ? {
  dark:true, bg:"#000000", g1:"rgba(28,28,30,0.78)", g2:"rgba(44,44,46,0.68)", g3:"rgba(58,58,60,0.55)",
  b1:"rgba(255,255,255,0.09)", bTop:"rgba(255,255,255,0.20)",
  text:"#FFFFFF", textSub:"rgba(255,255,255,0.70)", textFaint:"rgba(255,255,255,0.32)", textGhost:"rgba(255,255,255,0.14)",
  sep:"rgba(255,255,255,0.06)", tabBg:"rgba(8,8,10,0.82)", tabBorder:"rgba(255,255,255,0.10)",
  blue:"#0A84FF", green:"#30D158", red:"#FF453A", orange:"#FF9F0A",
  shadow:"0 8px 32px rgba(0,0,0,0.55)", glow:(c)=>`0 0 10px ${c}`,
  statusText:"#FFFFFF", diIsland:"#000000", diShadow:"0 0 0 1px #000, 0 6px 24px rgba(0,0,0,0.9)",
  noiseOp:0.038,
  ambientTop:"radial-gradient(ellipse,rgba(10,132,255,0.13) 0%,transparent 68%)",
  ambientBR:"radial-gradient(ellipse,rgba(191,90,242,0.09) 0%,transparent 70%)",
  ambientBL:"radial-gradient(ellipse,rgba(48,209,88,0.06) 0%,transparent 70%)",
  progressBg:"rgba(255,255,255,0.07)",
  inputFocus:(c)=>({border:`0.5px solid ${c}88`,boxShadow:`0 0 0 3px ${c}22`}),
  checkUnborder:"rgba(255,255,255,0.22)",
  delBg:"rgba(255,69,58,0.12)", delBgHov:"rgba(255,69,58,0.28)", delBorder:"rgba(255,69,58,0.30)",
  toggleBg:"rgba(255,255,255,0.10)", toggleBorder:"rgba(255,255,255,0.18)",
  statBg:(a)=>`${a}1A`, statBorder:(a)=>`${a}40`,
  suggBg:"rgba(22,22,24,0.99)", suggBorder:"rgba(255,255,255,0.12)", suggHov:"rgba(255,255,255,0.07)",
} : {
  dark:false, bg:"#F2F2F7", g1:"rgba(255,255,255,0.85)", g2:"rgba(248,248,253,0.80)", g3:"rgba(235,235,240,0.90)",
  b1:"rgba(0,0,0,0.07)", bTop:"rgba(255,255,255,0.95)",
  text:"#1C1C1E", textSub:"rgba(0,0,0,0.60)", textFaint:"rgba(0,0,0,0.38)", textGhost:"rgba(0,0,0,0.12)",
  sep:"rgba(0,0,0,0.06)", tabBg:"rgba(242,242,247,0.88)", tabBorder:"rgba(0,0,0,0.10)",
  blue:"#007AFF", green:"#34C759", red:"#FF3B30", orange:"#FF9500",
  shadow:"0 4px 24px rgba(0,0,0,0.09), 0 1px 4px rgba(0,0,0,0.06)", glow:()=>"none",
  statusText:"#1C1C1E", diIsland:"#1C1C1E", diShadow:"0 0 0 1px rgba(0,0,0,0.15), 0 4px 18px rgba(0,0,0,0.18)",
  noiseOp:0.015,
  ambientTop:"radial-gradient(ellipse,rgba(0,122,255,0.06) 0%,transparent 68%)",
  ambientBR:"radial-gradient(ellipse,rgba(191,90,242,0.04) 0%,transparent 70%)",
  ambientBL:"radial-gradient(ellipse,rgba(52,199,89,0.04) 0%,transparent 70%)",
  progressBg:"rgba(0,0,0,0.08)",
  inputFocus:(c)=>({border:`0.5px solid ${c}88`,boxShadow:`0 0 0 3px ${c}18`}),
  checkUnborder:"rgba(0,0,0,0.20)",
  delBg:"rgba(255,59,48,0.08)", delBgHov:"rgba(255,59,48,0.18)", delBorder:"rgba(255,59,48,0.22)",
  toggleBg:"rgba(0,0,0,0.07)", toggleBorder:"rgba(0,0,0,0.14)",
  statBg:(a)=>`${a}16`, statBorder:(a)=>`${a}35`,
  suggBg:"rgba(255,255,255,0.99)", suggBorder:"rgba(0,0,0,0.10)", suggHov:"rgba(0,0,0,0.04)",
};

const PALETTE=[
  {a:"#0A84FF",ld:"#007AFF"},{a:"#30D158",ld:"#34C759"},{a:"#BF5AF2",ld:"#AF52DE"},
  {a:"#FF9F0A",ld:"#FF9500"},{a:"#FF375F",ld:"#FF2D55"},{a:"#5AC8FA",ld:"#32ADE6"},{a:"#FFD60A",ld:"#FFCC00"},
];
const _cm={}; let _ci=0;
const pc=(name,dark)=>{
  if(!name) return {accent:PALETTE[0].a,dim:`${PALETTE[0].a}22`,glow:`${PALETTE[0].a}44`};
  if(!_cm[name]) _cm[name]=PALETTE[(_ci++)%PALETTE.length];
  const p=_cm[name]; const accent=dark?p.a:p.ld;
  return {accent,dim:`${accent}22`,glow:`${accent}44`};
};
const PRIO_DARK={high:"#FF453A",medium:"#FF9F0A",low:"#30D158"};
const PRIO_LIGHT={high:"#FF3B30",medium:"#FF9500",low:"#34C759"};
const SAMPLE=[
  {id:1,title:"Send proposal draft to client",project:"Brand Refresh",spoc:"Anika M.",due:"",priority:"high",done:false,notifyHrs:24},
  {id:2,title:"Review Q2 metrics deck",project:"Growth Strategy",spoc:"Rohan S.",due:new Date(Date.now()+86400000).toISOString().slice(0,10),priority:"high",done:false,notifyHrs:24},
  {id:3,title:"Follow up on contract sign-off",project:"Brand Refresh",spoc:"Priya K.",due:new Date(Date.now()+3*86400000).toISOString().slice(0,10),priority:"medium",done:false,notifyHrs:24},
  {id:4,title:"Set up analytics pipeline",project:"Tech Infra",spoc:"Dev Team",due:new Date(Date.now()+5*86400000).toISOString().slice(0,10),priority:"medium",done:false,notifyHrs:24},
  {id:5,title:"Kickoff call recap notes",project:"Growth Strategy",spoc:"Anika M.",due:new Date(Date.now()-86400000).toISOString().slice(0,10),priority:"low",done:true,notifyHrs:24},
  {id:6,title:"Design system token audit",project:"Tech Infra",spoc:"Dev Team",due:new Date(Date.now()+2*86400000).toISOString().slice(0,10),priority:"high",done:false,notifyHrs:24},
];

// ── Notifications ─────────────────────────────────────────────────────────────
function scheduleNotifications(tasks){
  if(!("Notification" in window)||Notification.permission!=="granted") return;
  const fired=JSON.parse(localStorage.getItem("notif_fired")||"{}");
  const now=Date.now();
  tasks.filter(t=>!t.done&&t.due&&t.notifyHrs>0).forEach(task=>{
    const dueMs=new Date(task.due).setHours(9,0,0,0);
    const notifyAt=dueMs-(task.notifyHrs*3600000);
    const key=`${task.id}_${task.notifyHrs}`;
    if(notifyAt>now&&!fired[key]){
      setTimeout(()=>{
        new Notification("Task Reminder ⏰",{body:`"${task.title}" — due ${task.notifyHrs>=24?`in ${task.notifyHrs/24} day(s)`:`in ${task.notifyHrs}h`}`,tag:key});
        const f=JSON.parse(localStorage.getItem("notif_fired")||"{}"); f[key]=true;
        localStorage.setItem("notif_fired",JSON.stringify(f));
      },Math.min(notifyAt-now,2147483647));
    }
  });
}
async function askNotifPermission(){ if(!("Notification" in window)) return "unsupported"; if(Notification.permission==="granted") return "granted"; if(Notification.permission==="denied") return "denied"; return await Notification.requestPermission(); }

// ── Helpers ───────────────────────────────────────────────────────────────────
function relDate(s,T){
  if(!s) return null;
  const t=new Date(); t.setHours(0,0,0,0); const d=new Date(s); d.setHours(0,0,0,0);
  const diff=Math.round((d-t)/86400000);
  if(diff<0) return {txt:`${Math.abs(diff)}d late`,c:T.red};
  if(diff===0) return {txt:"Today",c:T.orange};
  if(diff===1) return {txt:"Tomorrow",c:T.dark?"#FFD60A":"#B07D00"};
  if(diff<=7) return {txt:`${diff}d left`,c:T.green};
  return {txt:`${diff}d`,c:T.textFaint};
}
const initials=n=>(n||"?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
const glass=(T,r=20,extra={})=>({
  background:T.g1,backdropFilter:"blur(40px) saturate(200%)",WebkitBackdropFilter:"blur(40px) saturate(200%)",
  borderRadius:r,border:`0.5px solid ${T.b1}`,borderTop:`0.5px solid ${T.bTop}`,
  boxShadow:T.shadow+(T.dark?", inset 0 0.5px 0 rgba(255,255,255,0.10)":", inset 0 0.5px 0 rgba(255,255,255,0.80)"),
  ...extra,
});

// ── AutoInput ─────────────────────────────────────────────────────────────────
function AutoInput({value,onChange,placeholder,suggestions,style,T}){
  const [open,setOpen]=useState(false);
  const [focused,setFocused]=useState(false);
  const filtered=suggestions.filter(s=>s.toLowerCase().includes(value.toLowerCase())&&s.toLowerCase()!==value.toLowerCase());
  const show=open&&focused&&filtered.length>0&&value.length>0;
  return(
    <div style={{position:"relative"}}>
      <input value={value} onChange={e=>{onChange(e.target.value);setOpen(true);}} onFocus={()=>setFocused(true)} onBlur={()=>setTimeout(()=>setFocused(false),160)} placeholder={placeholder} style={style}/>
      {show&&(
        <div style={{position:"absolute",top:"calc(100% + 6px)",left:0,right:0,zIndex:9999,background:T.suggBg,border:`0.5px solid ${T.suggBorder}`,borderRadius:14,overflow:"hidden",boxShadow:"0 12px 40px rgba(0,0,0,0.30)",backdropFilter:"blur(40px)",WebkitBackdropFilter:"blur(40px)"}}>
          {filtered.slice(0,5).map((s,i)=>(
            <div key={i} onMouseDown={()=>{onChange(s);setOpen(false);}} style={{padding:"12px 14px",cursor:"pointer",fontSize:14,color:T.text,fontWeight:500,borderBottom:i<filtered.length-1?`0.5px solid ${T.sep}`:"none",transition:"background 0.1s"}} onMouseEnter={e=>e.currentTarget.style.background=T.suggHov} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <span style={{color:T.blue,fontWeight:800}}>{s.slice(0,value.length)}</span><span>{s.slice(value.length)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────
function Av({name,size=22,T}){
  const c=pc(name,T.dark);
  return(<div style={{width:size,height:size,borderRadius:size,background:c.dim,border:`0.5px solid ${c.glow}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><span style={{fontSize:size*.37,fontWeight:800,color:c.accent,letterSpacing:-0.5}}>{initials(name)}</span></div>);
}

// ── TaskRow ───────────────────────────────────────────────────────────────────
function TaskRow({task,onToggle,onDelete,second,T}){
  const [exiting,setExiting]=useState(false);
  const [checking,setChecking]=useState(false);
  const rel=relDate(task.due,T);
  const PRIO=T.dark?PRIO_DARK:PRIO_LIGHT;
  const doToggle=()=>{setChecking(true);setTimeout(()=>{setChecking(false);onToggle(task.id);},280);};
  const doDelete=()=>{setExiting(true);setTimeout(()=>onDelete(task.id),310);};
  return(
    <div style={{display:"flex",alignItems:"center",gap:12,padding:"13px 16px",borderBottom:`0.5px solid ${T.sep}`,opacity:exiting?0:1,transform:exiting?"translateX(36px) scale(0.96)":"translateX(0) scale(1)",transition:"opacity 0.3s ease, transform 0.3s cubic-bezier(0.4,0,1,1)"}}>
      <div style={{width:3,alignSelf:"stretch",minHeight:38,borderRadius:2,flexShrink:0,background:task.done?T.textGhost:PRIO[task.priority],boxShadow:task.done?"none":T.glow(PRIO[task.priority])}}/>
      <button onClick={doToggle} style={{width:26,height:26,borderRadius:26,flexShrink:0,cursor:"pointer",border:`1.5px solid ${task.done?T.green:T.checkUnborder}`,background:task.done?T.green:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.28s cubic-bezier(0.34,1.56,0.64,1)",transform:checking?"scale(0.82)":"scale(1)",boxShadow:task.done?`0 0 14px ${T.green}55`:"none"}}>
        {task.done&&<svg width="13" height="10" viewBox="0 0 13 10" fill="none" style={{animation:"checkPop 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}><path d="M1.5 5L5 8.5L11.5 1.5" stroke="white" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </button>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontSize:15,fontWeight:500,letterSpacing:-0.25,lineHeight:1.35,color:task.done?T.textFaint:T.text,textDecoration:task.done?"line-through":"none",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",marginBottom:5}}>{task.title}</div>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          {second&&<div style={{display:"flex",alignItems:"center",gap:5}}><Av name={second} size={16} T={T}/><span style={{fontSize:12,color:T.textFaint,fontWeight:500}}>{second}</span></div>}
          {rel&&<span style={{fontSize:11,fontWeight:700,color:rel.c,letterSpacing:0.1}}>{rel.txt}</span>}
          {task.notifyHrs>0&&task.due&&!task.done&&<span style={{fontSize:10,color:T.textFaint}}>🔔 {task.notifyHrs}h</span>}
        </div>
      </div>
      <button onClick={doDelete} style={{width:28,height:28,borderRadius:28,border:`0.5px solid ${T.delBorder}`,background:T.delBg,color:T.red,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,transition:"all 0.15s"}} onMouseEnter={e=>{e.currentTarget.style.background=T.delBgHov;}} onMouseLeave={e=>{e.currentTarget.style.background=T.delBg;}}>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
      </button>
    </div>
  );
}

// ── Quick Add (inline per group) ──────────────────────────────────────────────
function QuickAdd({prefillVal,view,onAdd,onClose,T,projectSuggestions,spocSuggestions}){
  const isProject=view==="project";
  const [title,setTitle]=useState("");
  const [second,setSecond]=useState("");
  const ref=useRef();
  useEffect(()=>{setTimeout(()=>ref.current?.focus(),80);},[]);
  const ready=title.trim().length>0;
  const secondSugg=isProject?spocSuggestions:projectSuggestions;
  const secondPlaceholder=isProject?"👤  Person responsible…":"📁  Project name…";
  const inp=(ov={})=>({width:"100%",background:T.dark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.05)",border:`0.5px solid ${T.b1}`,borderRadius:12,padding:"11px 13px",fontSize:14,fontFamily:"inherit",color:T.text,outline:"none",letterSpacing:-0.15,...ov});

  const submit=()=>{
    if(!ready) return;
    onAdd({
      title:title.trim(),
      project:isProject?prefillVal:second,
      spoc:isProject?second:prefillVal,
      due:"",priority:"medium",notifyHrs:24,
    });
    setTitle(""); setSecond(""); ref.current?.focus();
  };

  return(
    <div style={{borderTop:`0.5px solid ${T.sep}`,padding:"14px 16px 16px",background:T.dark?"rgba(255,255,255,0.025)":"rgba(0,0,0,0.02)",animation:"slideUp 0.22s ease both"}}>
      <div style={{fontSize:11,fontWeight:700,color:T.textFaint,letterSpacing:0.8,marginBottom:9}}>QUICK ADD</div>
      <input ref={ref} value={title} onChange={e=>setTitle(e.target.value)}
        onKeyDown={e=>{if(e.key==="Enter")submit();if(e.key==="Escape")onClose();}}
        placeholder="What needs to be done…"
        style={{...inp({marginBottom:8,...(title?{border:`0.5px solid ${T.blue}66`,boxShadow:`0 0 0 3px ${T.blue}14`}:{})})}}
      />
      <div style={{marginBottom:10}}>
        <AutoInput value={second} onChange={setSecond} placeholder={secondPlaceholder} suggestions={secondSugg} T={T} style={inp()}/>
      </div>
      <div style={{display:"flex",gap:8}}>
        <button onClick={submit} style={{flex:1,padding:"10px",borderRadius:12,background:ready?T.blue:T.textGhost,border:"none",color:ready?"#fff":T.textFaint,fontSize:13,fontWeight:700,cursor:ready?"pointer":"default",fontFamily:"inherit",transition:"all 0.18s",boxShadow:ready?`0 2px 14px ${T.blue}44`:"none"}}>
          Add ↵
        </button>
        <button onClick={onClose} style={{padding:"10px 16px",borderRadius:12,background:"transparent",border:`0.5px solid ${T.b1}`,color:T.textFaint,fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
          Done
        </button>
      </div>
    </div>
  );
}

// ── GroupCard ─────────────────────────────────────────────────────────────────
function GroupCard({name,tasks,view,onToggle,onDelete,onQuickAdd,idx,T,projectSuggestions,spocSuggestions}){
  const [open,setOpen]=useState(true);
  const [quickAdd,setQuickAdd]=useState(false);
  const c=pc(name,T.dark);
  const pending=tasks.filter(t=>!t.done).length;
  const pct=tasks.length>0?Math.round(((tasks.length-pending)/tasks.length)*100):0;
  const sorted=[...tasks].sort((a,b)=>{if(a.done!==b.done)return a.done?1:-1;return {high:0,medium:1,low:2}[a.priority]-{high:0,medium:1,low:2}[b.priority];});
  const allDone=pct===100;

  return(
    <div style={{...glass(T,20),overflow:"hidden",animation:`slideUp 0.42s ${idx*0.09}s both`}}>

      {/* Header */}
      <div style={{display:"flex",alignItems:"center",padding:"13px 14px 12px",gap:8}}>
        {/* Collapse area */}
        <button onClick={()=>setOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:9,flex:1,background:"transparent",border:"none",cursor:"pointer",textAlign:"left",padding:0,minWidth:0}}>
          <div style={{width:9,height:9,borderRadius:9,background:c.accent,flexShrink:0,boxShadow:T.dark?`0 0 10px ${c.glow}`:"none"}}/>
          <span style={{flex:1,fontSize:15,fontWeight:700,color:T.text,letterSpacing:-0.35,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{name}</span>
          <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,flexShrink:0,color:allDone?T.green:c.accent,background:allDone?T.statBg(T.green):T.statBg(c.accent),border:`0.5px solid ${allDone?T.statBorder(T.green):T.statBorder(c.accent)}`}}>
            {allDone?"Done ✓":`${pending} left`}
          </span>
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{transition:"transform 0.28s cubic-bezier(0.4,0,0.2,1)",transform:open?"rotate(0)":"rotate(-90deg)",color:T.textFaint,flexShrink:0}}>
            <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Quick-add + button */}
        <button
          onClick={e=>{e.stopPropagation();if(!open)setOpen(true);setQuickAdd(q=>!q);}}
          title={`Add task to ${name}`}
          style={{
            width:30,height:30,borderRadius:30,flexShrink:0,
            background:quickAdd?c.accent:T.statBg(c.accent),
            border:`0.5px solid ${c.accent}${quickAdd?"":"66"}`,
            display:"flex",alignItems:"center",justifyContent:"center",
            cursor:"pointer",color:quickAdd?"#fff":c.accent,
            transition:"all 0.22s cubic-bezier(0.34,1.3,0.64,1)",
            boxShadow:quickAdd?`0 2px 12px ${c.accent}55`:"none",
          }}
          onMouseDown={e=>e.currentTarget.style.transform="scale(0.88)"}
          onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}
          onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
            style={{transition:"transform 0.25s cubic-bezier(0.34,1.3,0.64,1)",transform:quickAdd?"rotate(45deg)":"rotate(0)"}}>
            <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      {open&&<div style={{height:2,background:T.progressBg,margin:"0 16px"}}><div style={{height:"100%",width:`${pct}%`,borderRadius:2,transition:"width 0.6s cubic-bezier(0.4,0,0.2,1)",background:allDone?T.green:`linear-gradient(90deg,${c.accent},${c.accent}BB)`,boxShadow:T.dark?`0 0 6px ${c.glow}`:"none"}}/></div>}

      {/* Task rows */}
      {open&&sorted.map(task=>(
        <TaskRow key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} second={view==="project"?task.spoc:task.project} T={T}/>
      ))}

      {/* Inline quick-add */}
      {quickAdd&&(
        <QuickAdd
          prefillVal={name} view={view}
          onAdd={(form)=>{onQuickAdd(form);}}
          onClose={()=>setQuickAdd(false)}
          T={T} projectSuggestions={projectSuggestions} spocSuggestions={spocSuggestions}
        />
      )}
    </div>
  );
}

// ── Notif Banner ──────────────────────────────────────────────────────────────
function NotifBanner({T,onGrant}){
  const [perm,setPerm]=useState(typeof Notification!=="undefined"?Notification.permission:"unsupported");
  if(perm==="granted"||perm==="denied"||perm==="unsupported") return null;
  return(
    <div style={{...glass(T,16),marginBottom:12,padding:"14px 16px",display:"flex",alignItems:"center",gap:12,border:`0.5px solid ${T.orange}55`}}>
      <span style={{fontSize:22}}>🔔</span>
      <div style={{flex:1}}>
        <div style={{fontSize:13,fontWeight:700,color:T.text,letterSpacing:-0.2}}>Enable Notifications</div>
        <div style={{fontSize:11,color:T.textFaint,marginTop:2}}>Get reminded before tasks are due</div>
      </div>
      <button onClick={async()=>{const r=await askNotifPermission();setPerm(r);if(r==="granted")onGrant();}} style={{padding:"8px 16px",borderRadius:20,background:T.orange,border:"none",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",boxShadow:`0 2px 12px ${T.orange}55`}}>Allow</button>
    </div>
  );
}

// ── Full Add Sheet ────────────────────────────────────────────────────────────
function AddSheet({onAdd,onClose,T,projectSuggestions,spocSuggestions,prefill}){
  const [form,setForm]=useState({title:"",project:prefill?.project||"",spoc:prefill?.spoc||"",due:"",priority:"medium",notifyHrs:24});
  const titleRef=useRef();
  useEffect(()=>{setTimeout(()=>titleRef.current?.focus(),160);},[]);
  const inp=(ov={})=>({width:"100%",background:T.g3,border:`0.5px solid ${T.b1}`,borderRadius:14,padding:"13px 14px",fontSize:14,fontFamily:"inherit",color:T.text,outline:"none",letterSpacing:-0.15,transition:"border 0.18s, box-shadow 0.18s",...ov});
  const ready=form.title.trim().length>0;
  const lbl=(t)=>(<div style={{fontSize:11,fontWeight:700,color:T.textFaint,letterSpacing:0.8,marginBottom:7}}>{t}</div>);
  const PRESETS=[{l:"1h",v:1},{l:"3h",v:3},{l:"6h",v:6},{l:"12h",v:12},{l:"24h",v:24},{l:"48h",v:48},{l:"Off",v:0}];
  return(
    <div style={{position:"fixed",inset:0,zIndex:300,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
      <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.50)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"}} onClick={onClose}/>
      <div style={{position:"relative",width:"100%",maxWidth:430,background:T.dark?"rgba(18,18,20,0.97)":"rgba(252,252,254,0.97)",backdropFilter:"blur(60px) saturate(200%)",WebkitBackdropFilter:"blur(60px) saturate(200%)",borderRadius:"30px 30px 0 0",borderTop:`0.5px solid ${T.bTop}`,borderLeft:`0.5px solid ${T.b1}`,borderRight:`0.5px solid ${T.b1}`,boxShadow:T.dark?"0 -12px 60px rgba(0,0,0,0.7)":"0 -8px 40px rgba(0,0,0,0.12)",animation:"sheetUp 0.38s cubic-bezier(0.34,1.1,0.64,1) both",paddingBottom:44,maxHeight:"92vh",overflowY:"auto"}}>
        <div style={{width:38,height:4,background:T.dark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.18)",borderRadius:4,margin:"12px auto 0"}}/>
        <div style={{padding:"18px 20px 0"}}>
          <div style={{fontSize:22,fontWeight:800,color:T.text,letterSpacing:-0.7,marginBottom:16}}>New Task</div>
          {lbl("TASK")}
          <textarea ref={titleRef} value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="What needs to get done?" rows={2} style={{...inp({fontSize:16,resize:"none",lineHeight:1.5,marginBottom:16,...(form.title?T.inputFocus(T.blue):{}),width:"100%"})}}/>
          {lbl("PROJECT")}
          <div style={{marginBottom:14}}><AutoInput value={form.project} onChange={v=>setForm(f=>({...f,project:v}))} placeholder="📁  e.g. Brand Refresh" suggestions={projectSuggestions} T={T} style={inp()}/></div>
          {lbl("SPOC / PERSON")}
          <div style={{marginBottom:14}}><AutoInput value={form.spoc} onChange={v=>setForm(f=>({...f,spoc:v}))} placeholder="👤  e.g. Anika M." suggestions={spocSuggestions} T={T} style={inp()}/></div>
          {lbl("DUE DATE")}
          <input type="date" value={form.due} onChange={e=>setForm(f=>({...f,due:e.target.value}))} style={{...inp({marginBottom:14,color:form.due?T.text:T.textFaint})}}/>
          {lbl("PRIORITY")}
          <div style={{display:"flex",gap:8,marginBottom:16}}>
            {[{k:"high",l:"🔴 High",c:T.red},{k:"medium",l:"🟡 Mid",c:T.orange},{k:"low",l:"🟢 Low",c:T.green}].map(p=>(
              <button key={p.k} onClick={()=>setForm(f=>({...f,priority:p.k}))} style={{flex:1,padding:"10px 6px",borderRadius:14,fontFamily:"inherit",border:`0.5px solid ${form.priority===p.k?p.c+"77":T.b1}`,background:form.priority===p.k?`${p.c}18`:T.g3,color:form.priority===p.k?p.c:T.textFaint,fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.18s"}}>{p.l}</button>
            ))}
          </div>
          {lbl("🔔 NOTIFY ME BEFORE DUE")}
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:form.notifyHrs>0?8:16}}>
            {PRESETS.map(p=>(
              <button key={p.v} onClick={()=>setForm(f=>({...f,notifyHrs:p.v}))} style={{padding:"7px 14px",borderRadius:20,fontFamily:"inherit",border:`0.5px solid ${form.notifyHrs===p.v?T.blue+"88":T.b1}`,background:form.notifyHrs===p.v?`${T.blue}18`:T.g3,color:form.notifyHrs===p.v?T.blue:T.textFaint,fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.18s"}}>{p.l}</button>
            ))}
          </div>
          {form.notifyHrs>0&&<div style={{fontSize:11,color:T.textFaint,marginBottom:16}}>Notify {form.notifyHrs>=24?`${form.notifyHrs/24} day(s)`:`${form.notifyHrs}h`} before due</div>}
          <button onClick={()=>{if(!ready)return;onAdd(form);}} style={{width:"100%",padding:"16px",borderRadius:16,fontFamily:"inherit",background:ready?T.blue:T.textGhost,border:"none",color:ready?"#FFFFFF":T.textFaint,fontSize:17,fontWeight:800,letterSpacing:-0.4,cursor:ready?"pointer":"default",boxShadow:ready?`0 4px 22px ${T.blue}55`:"none",transition:"all 0.25s cubic-bezier(0.34,1.2,0.64,1)"}}>Add Task</button>
        </div>
      </div>
    </div>
  );
}

// ── Theme Toggle ──────────────────────────────────────────────────────────────
function ThemeToggle({dark,onToggle,T}){
  return(<button onClick={onToggle} style={{width:34,height:34,borderRadius:34,background:T.toggleBg,border:`0.5px solid ${T.toggleBorder}`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.25s",color:T.textSub,flexShrink:0}} onMouseDown={e=>e.currentTarget.style.transform="scale(0.88)"} onMouseUp={e=>e.currentTarget.style.transform="scale(1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>{dark?<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5"/><path d="M8 1.5V2.5M8 13.5V14.5M1.5 8H2.5M13.5 8H14.5M3.4 3.4L4.1 4.1M11.9 11.9L12.6 12.6M12.6 3.4L11.9 4.1M4.1 11.9L3.4 12.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>:<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.5 9.5A5.5 5.5 0 0 1 6.5 2.5a5.5 5.5 0 1 0 7 7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}</button>);
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App(){
  const [tasks,setTasks]=useState([]);
  const [view,setView]=useState("project");
  const [filter,setFilter]=useState("all");
  const [showAdd,setShowAdd]=useState(false);
  const [loaded,setLoaded]=useState(false);
  const [dark,setDark]=useState(true);
  const [time,setTime]=useState(new Date());
  const T=makeTheme(dark);

  useEffect(()=>{
    try{const s=localStorage.getItem("taskapp_v1");if(s){const p=JSON.parse(s);setTasks(p.tasks||SAMPLE);setDark(p.dark!==undefined?p.dark:true);}else setTasks(SAMPLE);}catch{setTasks(SAMPLE);}
    setLoaded(true);
  },[]);
  useEffect(()=>{if(loaded){try{localStorage.setItem("taskapp_v1",JSON.stringify({tasks,dark}));}catch{}scheduleNotifications(tasks);}},[tasks,dark,loaded]);
  useEffect(()=>{const t=setInterval(()=>setTime(new Date()),30000);return()=>clearInterval(t);},[]);

  const toggle=id=>setTasks(t=>t.map(x=>x.id===id?{...x,done:!x.done}:x));
  const remove=id=>setTasks(t=>t.filter(x=>x.id!==id));
  const add=form=>{setTasks(t=>[...t,{...form,id:Date.now(),done:false}]);setShowAdd(false);};
  const quickAdd=form=>{setTasks(t=>[...t,{...form,id:Date.now(),done:false}]);};

  const projectSuggestions=[...new Set(tasks.map(t=>t.project).filter(Boolean))];
  const spocSuggestions=[...new Set(tasks.map(t=>t.spoc).filter(Boolean))];

  const base=tasks.filter(t=>filter==="all"?true:filter==="done"?t.done:!t.done);
  const gk=view==="project"?"project":"spoc";
  const grp={};
  base.forEach(t=>{const k=t[gk]||"Ungrouped";if(!grp[k])grp[k]=[];grp[k].push(t);});
  const groups=Object.entries(grp).sort(([,a],[,b])=>b.filter(x=>!x.done).length-a.filter(x=>!x.done).length);

  const pending=tasks.filter(t=>!t.done).length;
  const done=tasks.filter(t=>t.done).length;
  const pct=tasks.length>0?Math.round((done/tasks.length)*100):0;
  const projects=[...new Set(tasks.map(t=>t.project).filter(Boolean))].length;
  const timeStr=time.toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",hour12:false});
  const dateStr=time.toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});

  return(
    <div style={{background:dark?"#000":"#E5E5EA",minHeight:"100vh",display:"flex",justifyContent:"center",transition:"background 0.4s ease"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        button{font-family:inherit;}
        textarea::placeholder,input::placeholder{color:${T.textFaint};}
        input[type="date"]::-webkit-calendar-picker-indicator{filter:${dark?"invert(1)":"invert(0)"};opacity:0.4;}
        ::-webkit-scrollbar{width:0;height:0;}
        @keyframes slideUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes sheetUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
        @keyframes checkPop{0%{transform:scale(0)}60%{transform:scale(1.25)}100%{transform:scale(1)}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.65;transform:scale(0.85)}}
        @keyframes breathe{0%,100%{opacity:1}50%{opacity:0.6}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
      `}</style>
      <svg style={{position:"fixed",top:0,left:0,width:0,height:0}}><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter></svg>
      <div style={{position:"fixed",inset:0,filter:"url(#grain)",opacity:T.noiseOp,pointerEvents:"none",zIndex:9999}}/>

      <div style={{width:"100%",maxWidth:430,minHeight:"100vh",background:T.bg,fontFamily:"'Outfit',system-ui,sans-serif",color:T.text,position:"relative",overflow:"hidden",transition:"background 0.4s ease"}}>
        <div style={{position:"fixed",top:-150,left:"50%",transform:"translateX(-50%)",width:520,height:520,background:T.ambientTop,pointerEvents:"none",zIndex:0,animation:"breathe 6s ease-in-out infinite"}}/>
        <div style={{position:"fixed",bottom:-100,right:0,width:320,height:320,background:T.ambientBR,pointerEvents:"none",zIndex:0}}/>
        <div style={{position:"fixed",bottom:-60,left:0,width:260,height:260,background:T.ambientBL,pointerEvents:"none",zIndex:0}}/>

        {/* Status bar */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 24px 0",position:"relative",zIndex:10}}>
          <span style={{fontSize:16,fontWeight:700,color:T.statusText,letterSpacing:-0.3}}>{timeStr}</span>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <ThemeToggle dark={dark} onToggle={()=>setDark(d=>!d)} T={T}/>
            <div style={{display:"flex",gap:6,alignItems:"center",color:dark?"rgba(255,255,255,0.85)":"rgba(0,0,0,0.75)"}}>
              <svg width="18" height="13" viewBox="0 0 18 13" fill="currentColor"><rect x="0" y="5" width="3.5" height="8" rx="1.2"/><rect x="4.8" y="3" width="3.5" height="10" rx="1.2"/><rect x="9.6" y="1" width="3.5" height="12" rx="1.2"/><rect x="14.5" y="0" width="3.5" height="13" rx="1.2"/></svg>
              <div style={{width:27,height:13,borderRadius:4,border:`1.5px solid ${dark?"rgba(255,255,255,0.45)":"rgba(0,0,0,0.35)"}`,padding:"1.5px 2px",display:"flex",alignItems:"center"}}><div style={{flex:1,height:"100%",background:T.green,borderRadius:2}}/></div>
            </div>
          </div>
        </div>

        {/* Dynamic Island */}
        <div style={{display:"flex",justifyContent:"center",marginTop:10,position:"relative",zIndex:10}}>
          <div style={{background:T.diIsland,borderRadius:50,padding:"8px 20px",display:"flex",alignItems:"center",gap:9,border:`0.5px solid ${T.b1}`,boxShadow:T.diShadow,transition:"background 0.4s ease"}}>
            <div style={{width:8,height:8,borderRadius:8,flexShrink:0,background:pending===0?T.green:T.blue,boxShadow:`0 0 10px ${pending===0?T.green+"CC":T.blue+"CC"}`,animation:"pulse 2.4s ease-in-out infinite"}}/>
            <span style={{fontSize:13,fontWeight:600,color:dark?"rgba(255,255,255,0.82)":T.textSub,letterSpacing:-0.15}}>{pending===0?"All clear":`${pending} pending`}</span>
          </div>
        </div>

        {/* Header */}
        <div style={{padding:"20px 24px 0",position:"relative",zIndex:10}}>
          <div style={{fontSize:13,fontWeight:500,color:T.textFaint,letterSpacing:0.2,marginBottom:5}}>{dateStr}</div>
          <div style={{fontSize:34,fontWeight:900,color:T.text,letterSpacing:-1.2,lineHeight:1.1,marginBottom:20}}>{pending===0?"You're clear 🎉":`${pending} task${pending!==1?"s":""} ahead`}</div>
          <div style={{display:"flex",gap:10,marginBottom:18}}>
            {[{l:"Pending",v:pending,a:T.orange},{l:"Done",v:done,a:T.green},{l:"Projects",v:projects,a:T.blue}].map(s=>(
              <div key={s.l} style={{flex:1,background:T.statBg(s.a),borderRadius:16,padding:"12px 13px",border:`0.5px solid ${T.statBorder(s.a)}`,backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",transition:"background 0.4s ease"}}>
                <div style={{fontSize:26,fontWeight:900,color:s.a,letterSpacing:-1,lineHeight:1}}>{s.v}</div>
                <div style={{fontSize:11,color:`${s.a}AA`,fontWeight:700,marginTop:3,letterSpacing:0.1}}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{height:3,background:T.progressBg,borderRadius:3,marginBottom:18}}><div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${T.blue},${T.green})`,borderRadius:3,transition:"width 0.7s ease",boxShadow:dark?`0 0 10px ${T.blue}88`:"none"}}/></div>
          <div style={{display:"flex",background:dark?"rgba(255,255,255,0.055)":"rgba(0,0,0,0.055)",borderRadius:14,padding:3,marginBottom:12,border:`0.5px solid ${T.b1}`}}>
            {[{k:"project",l:"By Project"},{k:"spoc",l:"By Person"}].map(v=>(
              <button key={v.k} onClick={()=>setView(v.k)} style={{flex:1,padding:"9px 0",borderRadius:12,fontFamily:"inherit",background:view===v.k?dark?"rgba(255,255,255,0.11)":"rgba(255,255,255,0.85)":"transparent",border:view===v.k?`0.5px solid ${T.b1}`:`0.5px solid transparent`,color:view===v.k?T.text:T.textFaint,fontSize:13,fontWeight:700,cursor:"pointer",transition:"all 0.2s",letterSpacing:-0.1,boxShadow:view===v.k?T.shadow:"none"}}>{v.l}</button>
            ))}
          </div>
          <div style={{display:"flex",gap:8,marginBottom:6}}>
            {[{k:"all",l:"All"},{k:"pending",l:"Pending"},{k:"done",l:"Done"}].map(f=>(
              <button key={f.k} onClick={()=>setFilter(f.k)} style={{padding:"6px 16px",borderRadius:20,fontFamily:"inherit",background:filter===f.k?dark?"rgba(255,255,255,0.13)":"rgba(0,0,0,0.10)":"transparent",border:`0.5px solid ${filter===f.k?dark?"rgba(255,255,255,0.22)":"rgba(0,0,0,0.16)":T.b1}`,color:filter===f.k?T.text:T.textFaint,fontSize:12,fontWeight:700,cursor:"pointer",transition:"all 0.18s",letterSpacing:0.1}}>{f.l}</button>
            ))}
          </div>
        </div>

        {/* Groups */}
        <div style={{padding:"14px 20px 130px",display:"flex",flexDirection:"column",gap:12,position:"relative",zIndex:10}}>
          <NotifBanner T={T} onGrant={()=>scheduleNotifications(tasks)}/>
          {groups.length===0&&(<div style={{textAlign:"center",padding:"70px 0",animation:"fadeIn 0.5s"}}><div style={{fontSize:54,marginBottom:14}}>✦</div><div style={{fontSize:18,fontWeight:800,color:T.textFaint,letterSpacing:-0.4,marginBottom:6}}>Nothing here</div><div style={{fontSize:14,color:T.textGhost}}>Tap + to add your first task</div></div>)}
          {groups.map(([name,items],i)=>(
            <GroupCard key={name} name={name} tasks={items} view={view}
              onToggle={toggle} onDelete={remove} onQuickAdd={quickAdd}
              idx={i} T={T}
              projectSuggestions={projectSuggestions} spocSuggestions={spocSuggestions}
            />
          ))}
        </div>

        {/* Tab bar */}
        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:T.tabBg,backdropFilter:"blur(50px) saturate(200%)",WebkitBackdropFilter:"blur(50px) saturate(200%)",borderTop:`0.5px solid ${T.tabBorder}`,padding:"10px 36px 30px",display:"flex",justifyContent:"space-between",alignItems:"center",zIndex:50,transition:"background 0.4s ease"}}>
          {[{svg:<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="8" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.6"/><rect x="13" y="3" width="8" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.6"/><rect x="3" y="13" width="8" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.6"/><rect x="13" y="13" width="8" height="8" rx="2.5" stroke="currentColor" strokeWidth="1.6"/></svg>,l:"All",on:true},{svg:<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M12 7V12L15 14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,l:"Today",on:false}].map((t,i)=>(<div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,color:t.on?T.blue:T.textFaint,cursor:"pointer"}}>{t.svg}<span style={{fontSize:10,fontWeight:700,letterSpacing:0.2}}>{t.l}</span></div>))}
          <button onClick={()=>setShowAdd(true)} style={{width:56,height:56,borderRadius:56,background:T.blue,border:"none",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",boxShadow:`0 4px 22px ${T.blue}66`,transition:"transform 0.2s cubic-bezier(0.34,1.56,0.64,1)",marginTop:-30}} onMouseDown={e=>e.currentTarget.style.transform="scale(0.87)"} onMouseUp={e=>e.currentTarget.style.transform="scale(1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}><svg width="21" height="21" viewBox="0 0 21 21" fill="none"><path d="M10.5 3V18M3 10.5H18" stroke="white" strokeWidth="2.3" strokeLinecap="round"/></svg></button>
          {[{svg:<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,l:"Focus",on:false},{svg:<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6"/><path d="M4 20C4 16.7 7.6 14 12 14C16.4 14 20 16.7 20 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,l:"People",on:false}].map((t,i)=>(<div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,color:T.textFaint,cursor:"pointer"}}>{t.svg}<span style={{fontSize:10,fontWeight:700,letterSpacing:0.2}}>{t.l}</span></div>))}
        </div>
      </div>
      {showAdd&&<AddSheet onAdd={add} onClose={()=>setShowAdd(false)} T={T} projectSuggestions={projectSuggestions} spocSuggestions={spocSuggestions}/>}
    </div>
  );
}
