import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
function db(){return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.SUPABASE_SERVICE_ROLE_KEY || '', { auth: { persistSession:false } });}
async function authed(){ const store = await cookies(); return store.get('soul_admin')?.value === '1'; }
const roles = ['Founder','Co-Leader','Captain','Driver','Shooter','Member','Scout','Content Lead','Moderator','Elite'];
const teams = ['Core','Alpha','Bravo','Charlie','Media'];
const statuses = ['Active','Active','Active','Trial','Hold'];
const members = Array.from({length:20}, (_,i)=>({ real_name:'SOUL Member '+(i+1), game_name:'SOUL Player '+(i+1), instagram_id:'@soulplayer'+(i+1), role:roles[i%roles.length], team:teams[i%teams.length], activity_status:statuses[i%statuses.length], driving_skill:70+(i%25), game_skill:72+(i%22), teamwork:80, behavior:85, warnings_count:i%4, promotion_status:i%5===0?'Promoted':i%5===1?'Eligible':i%5===2?'Trial Running':i%5===3?'Hold':'Remove Review', alliance_tag:'SYN', notes:'Seeded member' }));
const events = [{title:'SOUL Night Run',type:'Clan Meet',time:'10:00 PM',status:'Planned',description:'Daily active run'},{title:'SYN Alliance Meetup',type:'Alliance',time:'9:30 PM',status:'Planned',description:'Alliance coordination'},{title:'Content Shoot',type:'Media',time:'11:00 PM',status:'Draft',description:'Instagram content'}];
const alliances = [{clan_name:'Royal Drift Crew',alliance_tag:'SYN',leader_instagram:'@royaldrift',status:'Active'},{clan_name:'Night Racers',alliance_tag:'SYN',leader_instagram:'@nightracers',status:'Pending'},{clan_name:'Redline Crew',alliance_tag:'SYN',leader_instagram:'@redlinecrew',status:'Active'}];
export async function POST(){
 if(!(await authed())) return NextResponse.json({error:'Unauthorized'},{status:401});
 const s=db();
 const m=await s.from('members').select('id').limit(1); if(!m.data?.length) await s.from('members').insert(members);
 const e=await s.from('events').select('id').limit(1); if(!e.data?.length) await s.from('events').insert(events);
 const a=await s.from('alliances').select('id').limit(1); if(!a.data?.length) await s.from('alliances').insert(alliances);
 return NextResponse.json({ok:true});
}
