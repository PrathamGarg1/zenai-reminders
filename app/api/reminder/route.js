import {nanoid} from 'nanoid'
import redis from '../../../lib/upstash';

export async function POST (req)  {
    const {text,timestamp} = await req.json();
    if(!text || !timestamp)return Response.json({ error: 'Missing text or timestamp' }, { status: 400 })
    const id=nanoid(8);
    await redis.hmset(`reminder:${id}`,{text,timestamp})
    await redis.expire(`reminder:${id}`, 48 * 360000); // 200 days
    return Response.json({ id, text, timestamp, link: `https://zenai.help/r/${id}` });
}

export async function GET(req){
    // to fetch a reminder by id 
    const {searchParams} = new URL (req.url);
    const id = searchParams.get('id');
    if(!id) return Response.json({ error: 'Missing id' }, { status: 400 }); 
    const data = await redis.hgetall(`reminder:${id}`);
    if (!data) return Response.json({ error: 'Invalid or expired id' }, { status: 404 });
    return Response.json({ ...data });
}