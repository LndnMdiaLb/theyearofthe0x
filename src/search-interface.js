function searchInterface(Twitter){

    /*  search for key words in a users tweets */

    async function searchTweets (searchObj) {
        try {
            const { 
                data:{
                    statuses: tweets
                }
            } = await Twitter.get("search/tweets", searchObj) ;
            return tweets ;
        } 
        catch (err) {
            return err ;
        }
    }

    return {
        searchTweets
    }

}

module.exports = searchInterface;