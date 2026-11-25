const express = require('express');
const path = require('path');
const movies = require('./movies.json');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));
app.get('/api/movies', (req,res)=>{
 const {q='',genre='All'}=req.query;
 const query=q.toLowerCase().trim();
 let result=movies.filter(m=>(!query || [m.title,m.description,m.language,...m.genres].join(' ').toLowerCase().includes(query)) && (genre==='All'||m.genres.includes(genre)));
 res.json(result);
});
app.post('/api/recommend', (req,res)=>{
 const prompt=String(req.body.prompt||'').toLowerCase();
 const words=prompt.split(/[^a-z0-9]+/).filter(Boolean);
 const scored=movies.map(movie=>{
  let score=0; const haystack=[movie.title,movie.description,...movie.genres,...movie.mood].join(' ').toLowerCase();
  words.forEach(w=>{if(w.length>2 && haystack.includes(w)) score+=2;});
  if(/space|cosmos|future|sci.?fi|mind|time/.test(prompt)&&movie.genres.includes('Sci-Fi'))score+=5;
  if(/laugh|funny|comedy|light|fun/.test(prompt)&&movie.genres.includes('Comedy'))score+=5;
  if(/cry|emotional|heart|feel|romantic/.test(prompt)&&movie.genres.includes('Drama'))score+=3;
  if(/action|fight|thrill|intense/.test(prompt)&&movie.genres.some(g=>['Action','Thriller'].includes(g)))score+=4;
  if(/myth|legend|epic|ancient/.test(prompt)&&movie.genres.some(g=>['Mythology','Fantasy','History'].includes(g)))score+=4;
  if(/similar to interstellar|like interstellar/.test(prompt)&&movie.genres.some(g=>['Sci-Fi','Adventure','Drama'].includes(g)))score+=3;
  if(/similar to dune|like dune/.test(prompt)&&movie.genres.some(g=>['Sci-Fi','Adventure'].includes(g)))score+=3;
  return {...movie,score};
 }).filter(m=>m.rating>0).sort((a,b)=>b.score-a.score||b.rating-a.rating).slice(0,5);
 res.json({intro:prompt?`Based on what you're in the mood for, here are a few picks worth your evening.`:'A few crowd-pleasers to get you started.',results:scored});
});
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'index.html')));
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>console.log(`CineMatch is running at http://localhost:${PORT}`));
