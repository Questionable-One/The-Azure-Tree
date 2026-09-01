addLayer("c", {
    name: "coal", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: true,
            points: new Decimal(0),
        }
    },
    color: "#545454",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "coal", // Name of prestige currency
    baseResource: "stone", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.49, // trol
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('c', 13)) mult = mult.times(2)
        if (hasUpgrade('i', 12)) mult = mult.times(1.5)
        if (hasUpgrade('cu', 12)) mult = mult.times(3)
        if (hasUpgrade('i', 14)) mult = mult.times(upgradeEffect('i', 14))
        if (hasUpgrade('cu', 14)) mult = mult.times(upgradeEffect('cu', 14))
        if (hasUpgrade('c', 32)) mult = mult.times(upgradeEffect('c', 32))
        if (hasUpgrade('su', 11)) mult = mult.times(2)
        if (getBuyableAmount('su', 11) > 0) mult = mult.times(buyableEffect('su', 11))
            if (hasUpgrade('si', 12)) mult = mult.times(upgradeEffect('si', 12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let total = 0
        if (hasUpgrade('i', 13)) total += 0.05
        if (hasUpgrade('cu', 13)) total += 0.05
        if (hasUpgrade('g', 11)) total += 0.9
        if (hasUpgrade('s', 14)) total += 1
        return total
    },
    autoUpgrade() { return hasUpgrade('s', 11) },
    infoboxes: {
        lore: {
            title: "Layer 1: Lightness | Coal",
            body() { return `A common, yet extremely useful ore. It’s quite the fuel source, allowing you to either use it for heat, cook, or maybe you’re a blacksmith and use it to help forge tools or alloys. Though given it’s usage, and how common it is, trying to find a buyer who doesn’t mine their own coal is difficult.` },
        },
    },
    upgrades: {
        11: {
            title: "Coal Upgrade 1",
            description: "Double your stone gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Coal Upgrade 2",
            description: "Double your stone gain again.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade('c', 11) }
        },
        13: {
            title: "Coal Upgrade 3",
            description: "Double your coal gain.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('c', 12) }
        },
        14: {
            title: "Coal Upgrade 4",
            description: "Double your stone gain yet again.",
            cost: new Decimal(10),
            unlocked() { return hasUpgrade('c', 13) }
        },
        15: {
            title: "Coal Upgrade 5",
            description: "Double your stone gain... again.",
            cost: new Decimal(15),
            unlocked() { return hasUpgrade('c', 14) }
        },
        21: {
            title: "Coal Upgrade I",
            description: "Unlock Iron, Increases the cost of Coal Upgrade C by 10x.",
            tooltip: "Iron focuses on increased Stone gain.",
            cost() {
                if (hasUpgrade('c', 22))
                    return new Decimal(300)
                else
                    return new Decimal(30)
            },
            effect() { return player.i.unlocked = true },
            unlocked() { return hasUpgrade('c', 15) }
        },
        22: {
            title: "Coal Upgrade C",
            description: "Unlock Copper, Increases the cost of Coal Upgrade I by 10x.",
            tooltip: "Copper focuses on increased Coal gain.",
            cost() {
                if (hasUpgrade('c', 21))
                    return new Decimal(300)
                else
                    return new Decimal(30)
            },
            effect() { return player.cu.unlocked = true },
            unlocked() { return hasUpgrade('c', 15) }
        },
        23: {
            title: "Coal Upgrade 6",
            description: "Double your stone gain... again... again.",
            cost: new Decimal(750),
            unlocked() { return hasUpgrade('c', 21) && hasUpgrade('c', 22) }
        },
        24: {
            title: "Coal Upgrade 7",
            description: "10x stone gain.",
            cost: new Decimal(1250),
            unlocked() { return hasUpgrade('c', 23) }
        },
        25: {
            title: "Coal Upgrade G",
            description: "Unlock Gold.",
            cost: new Decimal(3000),
            effect() { return player.g.unlocked = true },
            unlocked() { return hasUpgrade('c', 24) }
        },
        31: {
            title: "Coal Upgrade 8",
            description: "Increase Iron & Gold generation to 10%",
            cost: new Decimal(5000000),
            unlocked() { return hasUpgrade('c', 25) && hasUpgrade('r', 13) }
        },
        32: {
            title: "Coal Upgrade 9",
            description: "Coal boosts itself at a low rate.",
            cost: new Decimal(10000000),
            effect() {
                return player[this.layer].points.add(1).pow(0.075)
            },
            tooltip: "Formula: Coal+1^0.075",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() { return hasUpgrade('c', 31) }
        },
        33: {
            title: "Coal Upgrade Su",
            description: "Generate 10000% of Sulfur every second.",
            cost: new Decimal(125),
            tooltip: "Yes, You heard that right.",
            unlocked() { return hasUpgrade('su', 12) }
        },
        34: {
            title: "Coal Upgrade Ag",
            description: "Generate 100% of Silver every second.",
            cost: new Decimal(125),
            unlocked() { return hasUpgrade('si', 13) }
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "c", description: "C: Reset for coal", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return true }
})
addLayer("cu", {
    name: "copper", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Cu", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    onPrestige() { player.c.points = new Decimal(0) },
    color: "#e39f5c",
    requires: new Decimal(20), // Can be a function that takes requirement increases into account
    resource: "copper", // Name of prestige currency
    baseResource: "coal", // Name of resource prestige is based on
    baseAmount() { return player.c.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('g', 14)) mult = mult.times(2)
        if (hasUpgrade('i', 15)) mult = mult.times(3)
        if (hasUpgrade('su', 12)) mult = mult.times(2)
        if (hasUpgrade('si', 12)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let total = 0
        if (hasUpgrade('r', 12)) total += 0.01
        if (hasUpgrade('c', 31)) total += 0.09
        if (hasUpgrade('s', 14)) total += 1
        return total
    },
    autoUpgrade() { return hasUpgrade('s', 11) },
    infoboxes: {
        lore: {
            title: "Layer 1: Lightness | Copper",
            body() { return `A common ore used for all sorts of electrical circuits, as it is a great conductor. Even other civilizations utilize its excellent electrical benefits. Even the army for the D.U.C wields blades made of pure copper, letting it surge with electricity, making it both very efficient and shocking. Though this property isn’t useful in pickaxes given its weakness.` },
        },
    },
    upgrades: {
        11: {
            title: "Copper Upgrade 1",
            description: "1.5x Stone gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Copper Upgrade 2",
            description: "Triple your coal gain.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade('cu', 11) }
        },
        13: {
            title: "Copper Upgrade 3",
            description: "Generate +5% of Coal every second.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('cu', 12) }
        },
        14: {
            title: "Copper Upgrade 4",
            description: "Copper boosts Gold and Coal.",
            cost: new Decimal(25),
            effect() {
                return player[this.layer].points.add(1).pow(0.2)
            },
            tooltip: "Formula: Copper+1^0.2",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() { return hasUpgrade('cu', 13) && hasUpgrade('g', 12) }
        },
        15: {
            title: "Copper Upgrade 5",
            description: "3x Iron & 1.5x Ruby",
            cost: new Decimal(1000),
            unlocked() { return hasUpgrade('cu', 14) && hasUpgrade('r', 13) }
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "u", description: "U: Reset for copper", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasUpgrade('c', 22) || hasUpgrade('cu', 11) || player.cu.points > 0 }
})
addLayer("i", {
    name: "iron", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Fe", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    onPrestige() { player.c.points = new Decimal(0) },
    color: "#bcb399",
    requires: new Decimal(20), // Can be a function that takes requirement increases into account
    resource: "iron", // Name of prestige currency
    baseResource: "coal", // Name of resource prestige is based on
    baseAmount() { return player.c.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('g', 14)) mult = mult.times(2)
        if (hasUpgrade('cu', 15)) mult = mult.times(3)
        if (hasUpgrade('su', 12)) mult = mult.times(2)
        if (hasUpgrade('si', 11)) mult = mult.times(4)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let total = 0
        if (hasUpgrade('r', 12)) total += 0.01
        if (hasUpgrade('c', 31)) total += 0.09
        if (hasUpgrade('s', 14)) total += 1
        return total
    },
    autoUpgrade() { return hasUpgrade('s', 11) },
    infoboxes: {
        lore: {
            title: "Layer 1: Lightness | Iron",
            body() { return `Iron on its own isn’t the best, however given how plentiful it and carbon sources like Coal are, it’s not too much of a hassle to make large quantities of steel. The Haven is said to refer to iron as an artifact of some sort. The amount of praise Iron gets is probably due to the lack of native ore in the haven. The Azure Mines is at least free from this “iron curse” given it actually has native ore.` },
        },
    },
    upgrades: {
        11: {
            title: "Iron Upgrade 1",
            description: "5x stone gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Iron Upgrade 2",
            description: "1.5x Coal gain.",
            cost: new Decimal(2),
            unlocked() { return hasUpgrade('i', 11) }
        },
        13: {
            title: "Iron Upgrade 3",
            description: "Generate +5% of Coal every second.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('i', 12) }
        },
        14: {
            title: "Iron Upgrade 4",
            description: "Iron boosts Gold and Coal.",
            cost: new Decimal(25),
            effect() {
                return player[this.layer].points.add(1).pow(0.2)
            },
            tooltip: "Formula: Iron+1^0.2",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() { return hasUpgrade('i', 13) && hasUpgrade('g', 12) }
        },
        15: {
            title: "Iron Upgrade 5",
            description: "3x Copper & 1.5x Ruby",
            cost: new Decimal(1000),
            unlocked() { return hasUpgrade('i', 14) && hasUpgrade('r', 13) }
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "i", description: "I: Reset for iron", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasUpgrade('c', 21) || hasUpgrade('i', 11) || player.i.points > 0 }
})
addLayer("g", {
    name: "gold", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Au", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    onPrestige() { player.c.points = new Decimal(0) },
    color: "#d8c21c",
    requires: new Decimal(2000), // Can be a function that takes requirement increases into account
    resource: "gold", // Name of prestige currency
    baseResource: "coal", // Name of resource prestige is based on
    baseAmount() { return player.c.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('i', 14)) mult = mult.times(upgradeEffect('i', 14))
        if (hasUpgrade('cu', 14)) mult = mult.times(upgradeEffect('cu', 14))
        if (hasUpgrade('su', 13)) mult = mult.times(2)
        if (hasUpgrade('si', 14)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
        passiveGeneration() {
        let total = 0
        if (hasUpgrade('s', 14)) total += 1
        return total
    },
    autoUpgrade() { return hasUpgrade('s', 11) },
    infoboxes: {
        lore: {
            title: "Layer 1: Lightness | Gold",
            body() { return `Now this is the real deal. This isn’t any of that fake Pyrite people confuse it with, this is 100% real gold! Maybe there’s a few other things mixed in there but it’s mostly gold. While it’s extremely valuable, it’s not very good for tools due to how soft this metal is. Though it does grant you some “swag” points when you mine with a gold pickaxe, but in reality this does absolutely nothing beneficial to you.` },
        },
    },
    upgrades: {
        11: {
            title: "Gold Upgrade 1",
            description: "Generate +90% of Coal every second.",
            cost: new Decimal(1),
        },
        12: {
            title: "Gold Upgrade 2",
            description: "Unlock more Iron & Copper upgrades.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade('g', 11) }
        },
        13: {
            title: "Gold Upgrade R",
            description: "Unlock Ruby.",
            cost: new Decimal(15),
            effect() { return player.r.unlocked = true },
            unlocked() { return hasUpgrade('g', 12) }
        },
        14: {
            title: "Gold Upgrade 3",
            description: "2x Copper & Iron.",
            cost: new Decimal(1000),
            unlocked() { return hasUpgrade('r', 13) && hasUpgrade('g', 13) }
        },
        15: {
            title: "Gold Upgrade 4",
            description: "Gold boosts Coal.",
            cost: new Decimal(2000),
            effect() {
                return player[this.layer].points.add(1).pow(0.6)
            },
            tooltip: "Formula: Gold+1^0.6",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() { return hasUpgrade('g', 14) }
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "g", description: "G: Reset for gold", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasUpgrade('c', 25) || hasUpgrade('g', 11) || player.g.points > 0 }
})
addLayer("r", {
    name: "ruby", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    onPrestige() { player.g.points = new Decimal(0) },
    color: "#d84064",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "ruby", // Name of prestige currency
    baseResource: "gold", // Name of resource prestige is based on
    baseAmount() { return player.g.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('i', 15)) mult = mult.times(1.5)
        if (hasUpgrade('cu', 15)) mult = mult.times(1.5)
        if (hasUpgrade('su', 14)) mult = mult.times(2)
        if (hasUpgrade('si', 13)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
       passiveGeneration() {
        let total = 0
        if (hasUpgrade('s', 14)) total += 1
        return total
    },
    autoUpgrade() { return hasUpgrade('s', 11) },
    infoboxes: {
        lore: {
            title: "Layer 1: Lightness | Ruby",
            body() { return `A deep-red gemstone which is only really good for cosmetic purposes. Though wizards have found beneficial usages for all of the gemstones. When a wizard is heavily influenced by the emotions inflicted by Vulcan’s rage, it is capable of soothing their anger and channeling their peace into equally powerful strength that anger would’ve provided.` },
        },
    },
    upgrades: {
        11: {
            title: "Ruby Upgrade 1",
            description: "Here comes the upgrade you've been waiting for: Coal boosts Stone.",
            effect() {
                return player.c.points.add(1).pow(0.475)
            },
            tooltip: "Formula: Coal+1^0.475",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            cost: new Decimal(1),
        },
        12: {
            title: "Ruby Upgrade 2",
            description: "Quality of life, Generate 1% of Iron & Copper every second.",
            cost: new Decimal(3),
            unlocked() { return hasUpgrade('r', 11) }
        },
        13: {
            title: "Ruby Upgrade 3",
            description: "Unlock more upgrades in the previous ores.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('r', 12) }
        },
        14: {
            title: "Ruby Upgrade S",
            description: "Unlock Sapphire.",
            cost: new Decimal(100),
            effect() { return player.s.unlocked = true },
            unlocked() { return hasUpgrade('r', 13) }
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "r", description: "R: Reset for ruby", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasUpgrade('g', 13) || hasUpgrade('r', 11) || player.r.points > 0 }
})
addLayer("s", {
    name: "sapphire", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Sp", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    color: "#1d97d8",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "sapphire", // Name of prestige currency
    baseResource: "ruby", // Name of resource prestige is based on
    baseAmount() { return player.r.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('su', 15)) mult = mult.times(2)
        if (hasUpgrade('si', 15)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    infoboxes: {
        lore: {
            title: "Layer 2: Dreams | Sapphire",
            body() { return `A deep-blue gemstone which only is really good for cosmetic purposes. Though wizards have found beneficial usages for all of the gemstones. When a wizard is heavily influenced by the emotions inflicted by [REDACTED]'s sorrow, it is capable of clearing the mind and soothing the thoughts of those influenced by its power.` },
        },
    },
    upgrades: {
        11: {
            title: "Sapphire Upgrade 1",
            description: "Automate most Layer 1 upgrades.",
            tooltip: "we just started",
            cost: new Decimal(1),
        },
        12: {
            title: "Sapphire Upgrade Su",
            description: "Unlock Sulfur",
            effect() { return player.su.unlocked = true },
            cost: new Decimal(1),
        },
        13: {
            title: "Sapphire Upgrade Si",
            description: "Unlock Silver",
            effect() { return player.si.unlocked = true },
            cost: new Decimal(1),
        },
        14: {
            title: "Sapphire Upgrade 2",
            description: "Generate +100% of most Layer 1 currencies every second.",
            cost: new Decimal(5),
            unlocked() { return hasUpgrade('s', 11) && hasUpgrade('s', 12) && hasUpgrade('s', 13) }
        },
        15: {
            title: "Sapphire Upgrade E",
            description: "Unlock Emerald",
            tooltip: "NOTE: EMERALD REQUIRES 50 SAPPHIRE",
            cost: new Decimal(50),
            effect() { return player.e.unlocked = true },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "s", description: "S: Reset for sapphire", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasUpgrade('r', 14) || hasUpgrade('s', 11) || hasUpgrade('s', 12) || hasUpgrade('s', 13) || player.s.points > 0 }
})
addLayer("su", {
    name: "sulfur", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Su", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    resetsNothing: true,
    color: "#cacf6c",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "sulfur", // Name of prestige currency
    baseResource: "coal", // Name of resource prestige is based on
    baseAmount() { return player.c.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.99, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('su', 15)) mult = mult.times(2)
        if (hasUpgrade('si', 15)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let total = 0
        if (hasUpgrade('c', 33)) total += 100
        return total
    },
    infoboxes: {
        lore: {
            title: "Layer 1: Lightness | Sulfur",
            body() { return `This common ore has barely any usage to it. It’s often used for matches, fireworks, or gunpowder. With that knowledge, maybe this can be used to create helpful equipment to clear our large areas underground.` },
        },
    },
    buyables: {
        11: {
            title: "Sulfur Buyable",
            cost(x) { return new Decimal(1000000).times(buyableEffect(this.layer, this.id)).times(buyableEffect(this.layer, this.id)).times(buyableEffect(this.layer, this.id)).times(buyableEffect(this.layer, this.id)).times(buyableEffect(this.layer, this.id)) }, // i suck at this whole formula thing
            display() { return `1.5x Coal compounding per level.<br>Cost: ${format(this.cost())} Sulfur<br>Effect: ${format(buyableEffect(this.layer, this.id))}` },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buyMax() { return true },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked() { return hasUpgrade('su', 14) },
            effect(x) {
                return Decimal.pow(1.5, x);
            }
        },
    },
    upgrades: {
        11: {
            title: "Sulfur Upgrade 1",
            description: "2x Coal",
            cost: new Decimal(2000),
        },
        12: {
            title: "Sulfur Upgrade 2",
            description: "2x Iron & Copper, Unlock a Coal upgrade",
            cost: new Decimal(10000),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
        13: {
            title: "Sulfur Upgrade 3",
            description: "2x Gold",
            cost: new Decimal(100000),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
        14: {
            title: "Sulfur Upgrade 4",
            description: "2x Ruby, Unlock a Sulfur buyable.",
            cost: new Decimal(1000000),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
        15: {
            title: "Sulfur Upgrade 5",
            description: "2x Sapphire, Sulfur & Silver",
            cost: new Decimal(100000000),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "l", description: "L: Reset for sulfur", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasUpgrade('s', 12) || hasUpgrade('su', 11) || player.su.points > 0 }
})
addLayer("si", {
    name: "silver", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Ag", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    onPrestige() { player.i.points = new Decimal(0) },
    color: "#dfdfdf",
    requires: new Decimal(3), // Can be a function that takes requirement increases into account
    resource: "silver", // Name of prestige currency
    baseResource: "iron", // Name of resource prestige is based on
    baseAmount() { return player.i.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('su', 15)) mult = mult.times(2)
        if (hasUpgrade('si', 15)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let total = 0
        if (hasUpgrade('c', 34)) total += 1
        return total
    },
    infoboxes: {
        lore: {
            title: "Layer 1: Lightness | Silver",
            body() { return `While used for basic things like jewelry or silverware, it has magical properties that cause more damage to the undead than regular materials. It is unknown as to why this happens, however hunters find silver bullets to be the best use of silver, as plentiful amounts of them can be made and deal as much, or maybe more, damage as a sword made of silver.` },
        },
    },
    upgrades: {
        11: {
            title: "Silver Upgrade 1",
            description: "4x Iron.",
            cost: new Decimal(3),
        },
        12: {
            title: "Silver Upgrade 2",
            description: "2x Copper, Silver boosts Coal.",
            cost: new Decimal(10),
             effect() {
                return player.si.points.add(1).pow(0.5)
            },
            tooltip: "Formula: Silver+1^0.5",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
        13: {
            title: "Silver Upgrade 3",
            description: "2x Ruby, Unlocks a Coal upgrade.",
            cost: new Decimal(15),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
        14: {
            title: "Silver Upgrade 4",
            description: "3x Gold.",
            cost: new Decimal(25),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
        15: {
            title: "Silver Upgrade 5",
            description: "2x Sapphire, Sulfur & Silver",
            cost: new Decimal(40),
            unlocked() { return hasUpgrade(this.layer, this.id - 1) }
        },
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "v", description: "V: Reset for silver", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasUpgrade('s', 13) || hasUpgrade('si', 11) || player.si.points > 0 }
})
addLayer("e", {
    name: "emerald", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() {
        return {
            unlocked: false,
            points: new Decimal(0),
        }
    },
    color: "#0ed8a6",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "emerald", // Name of prestige currency
    baseResource: "sapphire", // Name of resource prestige is based on
    baseAmount() { return player.s.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    infoboxes: {
        lore: {
            title: "Layer 3: Cavern | Emerald",
            body() { return `A deep-green gemstone which only is really good for cosmetic purposes. Though wizards have found beneficial usages for all of the gemstones. Oftentimes, Wizards are lost in thought and impacted both by rage or sorrow. However Emeralds are capable of stimulating both the mind and heart, and leaves the user to emotionally heal, letting Daegel’s joy assist them on their journey.` },
        },
    },
    upgrades: {
        11: {
            title: "Emerald Upgrade 1",
            description: "you get the point by now",
            cost: new Decimal(1),
        },
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "e", description: "E: Reset for emerald", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasUpgrade('s', 15) || hasUpgrade('e', 11) || player.e.points > 0 }
})
