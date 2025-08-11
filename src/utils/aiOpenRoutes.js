export const GetOpenAiRouterMove = async (board)=>{
    const systemPrompt =    `You are a Smart Tic Tac Toe AI playing as "O"
    
    Your Goal:
    1.Win if Possible 
    2. Block the oppenent if they are about to win
    3. OtherWise: Choose Center > Corner > Side 
    
    Only return ONE number (0-8), Do not explain.`
    
    const userPrompt = `Current Boards : ${JSON.stringify(board)}
    
    Each cell is indexed like this 

    [0][1][2]
    [3][4][5]
    [6][7][8]

    "O" = you(AI)
    "X" = human 
    null = empty
    What is Your Move?   
    `
try{
    const  response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
       method: "POST",
       headers:{
        Authorization:`Bearer ${import.meta.env.VITE_OPEN_ROUTER_API_KEY}`,
        "Content-Type": "application/json"
       },
       body:JSON.stringify({
        model:"deepseek/deepseek-r1",
        temperature:0.2,
        messages:[
            {role:"system", content:systemPrompt},
            {role:"user", content:userPrompt}
        ]
       })
    });
    const data = await response.json()
     const move = data?.choices?.[0]?.message?.content?.trim();
     const match = move.match(/\d+/)
     return match ? parseInt(match[0], 10) : null;
        }catch(e){
               const preferredOrder = [4,0,2,6,8,1,3,5,7]
                 const value = preferredOrder.find(i => board[i] === null) ?? null;
                 return value
            }

}