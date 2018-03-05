const friends = require('../data/friends');

module.exports = function(app) {

    //GETS the route to display possible friends in JSON
    app.get('/api/friends', function(req, res){
        res.json(friends);
    });
    //POST route and will handle all incoming survey results plus the compatibility logic
    app.post('/api/friends', function(req, res){
       const bestMatch = {
                name: "",
                photo: "",
                friendDifference: 10000
        };

       const userData = req.body;
       const userScores = userData.scores;
       
       var totalDifference = 0;

       //loops through friends object to compare
        for (var i = 0; i < friends.length; i++){
           
            var totalDifference = 0;
            //loops through the scores for each friend available
            for (var j = 0; j < friends[i].scores[j]; j++){
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                //finds the best compatibility/match
                if (totalDifference <= bestMatch.friendDifference){
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }
        //pushes new friend to the API
        friends.push(userData);
        res.json(bestMatch);
    });

}