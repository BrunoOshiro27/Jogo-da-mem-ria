let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    setCard:function(id){
       let card = this.cards.filter(card => card.id === id)[0]
       
        if(card.flipped || this.lockMode){
            return false
        }
        if(!this.firstCard){
            this.firstCard = card
            this.firstCard.flipped = true
            return true
        } else{
            this.secondCard = card
            this.secondCard.flipped = true
            this.lockMode = true
            return true
        }
    },

    checkMatch: function(){
        if(!this.firstCard || !this.secondCard){
            return false
        }
        return this.firstCard.icon === this.secondCard.icon
    },

    clearCards: function(){
        this.firstCard = null
        this.secondCard = null
        this.lockMode = false
    },
    unflipCard(){
        this.firstCard.flipped = false
        this.secondCard.flipped = false
        this.clearCards()
    },
    checkGameOver(){
        return this.cards.filter(card => !card.flipped).length == 0
    },

    bugs: ['acaro',
    'actias-luna',
    'besouro (1)',
    'besouro',
    'cigarra',
    'golias',
    'grilo',
    'joaninha',
    'tarantula',
    'viuva-negra'],
    cards:null,
    createCardsFromBugs: function(){
        this.cards = []
        this.bugs.forEach((bug) => {
            this.cards.push(this.createPairFromBugs(bug))
        })
        this.cards = this.cards.flatMap(pair => pair)
        this.shuffleCards()
        return this.cards
    },
    
    createPairFromBugs: function(bug){
        return[{
            id:this.createIdWithBugs(bug),
            icon: bug,
            flipped: false,
        }, {
            id:this.createIdWithBugs(bug),
            icon: bug,
            flipped: false,
        }]
    },
    
    createIdWithBugs: function(bug){
        return bug + parseInt(Math.random()*1000)
    },
    shuffleCards:function (cards){
        let currentIndex = this.cards.length
        let randonIndex = 0
    
        while(currentIndex !== 0){
            randonIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
            [this.cards[randonIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randonIndex]]
        }
    }
    
}
