new Vue ({
    el: "#app",
    data: {
        gameStarted : false,
        userHealth : 100,
        monsterHealth : 100,
        userAttackCoefficient: 10,
        userSpecialAttackCoefficient : 15,
        firstAidCoefficient: 22,
        monsterAttackCoefficient:18,    
        logs : [],
        logText : {
            attack : "OYUNCU ATAĞI :",
            special_attack : "ÖZEL OYUNCU ATAĞI : ",
            monster_attack : "CANAVAR ATAĞI : ",
            heal_up : "İLK YARDIM",
            give_up : "OYUNCU PES ETTİ!!!"
        },

    },
    methods : {
        gameStart : function () {
            this.gameStarted = true
            this.userHealth = 100
            this.monsterHealth = 100
            
        },
        userAttack : function (){
            let attack_power = Math.ceil(Math.random() * this.userAttackCoefficient)
            this.monsterHealth -= attack_power
            this.monsterAttack()
            this.logs.push({key: "user", text: this.logText.attack + attack_power   })

        },
        userSpecialAttack : function() {
            let attack_power = Math.ceil(Math.random() * this.userSpecialAttackCoefficient)
            this.monsterHealth -= attack_power
            this.monsterAttack()
            this.logs.push({key: "user", text: this.logText.special_attack + attack_power   })

        },
        firstAid : function () {
            let aid_power = Math.ceil(Math.random() * this.firstAidCoefficient)
            this.userHealth += aid_power
            this.monsterAttack()
            this.logs.push({key: "user", text: this.logText.heal_up + aid_power   })

        },
        monsterAttack : function () {
            let attack_power = Math.ceil(Math.random() * this.monsterAttackCoefficient)
            this.userHealth -= attack_power
            this.logs.push({key: "monster", text: this.logText.monster_attack + attack_power })

        },
        giveUp : function () {
            this.userHealth = 0
            this.logs = []
            
        },        
    },
    watch : {
        userHealth : function() {
            if (this.userHealth <= 0) {
                this.userHealth = 0
                if(confirm("Yow Lose the Game, Do you want to play again?")){
                    this.userHealth = 100
                    this.monsterHealth = 100
                    this.logs = []
                }
                
            }
            else if (this.userHealth>100) {
                this.userHealth = 100
            }
        },
        monsterHealth : function() {
            if (this.monsterHealth <= 0) {
                this.monsterHealth = 0
                if(confirm("Yow Won the Game, Do you want to play again?")) {
                    this.userHealth = 100
                    this.monsterHealth = 100
                    this.logs = []
                }
            }
            else if(this.monsterHealth>100) {
                this.monsterHealth =100
            }
        }

    },
    computed : {
        player_progress: function() {
            return {width: this.userHealth + "%"}
        },

        monster_progress : function() {
            return {width: this.monsterHealth + "%"}
        },
        logsDisplay : function () {
            if (this.logs.length <= 0) {
                return {
                    display : "none"
                }
            }
            else {
                return {
                    display : "block"
                }
            }
        }
    }

})