// web fallback page 
import React from 'react'
import redis from '../../../lib/upstash';

const Page = async  ({params}) => {
    const {id} = params;
    const data = await redis.hgetall(`reminder:${id}`);
    if(!data){
        return <div>Reminder expired!</div>
    }
  return (
    <div style={{textAlign:'center',padding:40}}>
        <h2>Zenai Reminders</h2>
        <p style={{fontSize:20}}>{data.text}</p>
        <button
            onClick={()=>window.location.href=`zenai://set-reminder?id=${id}&text=${encodeURIComponent(data.text)}&timestamp=${data.timestamp}`}
            style={{ fontSize: 24, padding: '16px 32px', marginTop: 24 }}
        >
            Set Reminder
        </button>
        <p style={{ marginTop: 16, fontSize: 14 }}>Or open in the Zenai app.</p>
    </div>
  )
}

export default Page
