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
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('c', 13)) mult = mult.times(2)
        if (hasUpgrade('i', 12)) mult = mult.times(3)
        if (hasUpgrade('cu', 12)) mult = mult.times(5)
if (hasUpgrade('i', 14)) mult = mult.times(upgradeEffect('i', 14))
        if (hasUpgrade('cu', 14)) mult = mult.times(upgradeEffect('cu', 14))
        return mult
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    passiveGeneration() {
        let total = new Decimal(0)
        if (hasUpgrade('i', 13)) total = total.add(0.05)
        if (hasUpgrade('cu', 13)) total = total.add(0.05)
        if (hasUpgrade('g', 11)) total = total.add(0.9)
        return total
    },
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
            description: "5x stone gain.",
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
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
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
        //if (hasUpgrade('c', 13)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    infoboxes: {
        lore: {
            title: "Layer 1: Lightness | Copper",
            body() { return `A common ore used for all sorts of electrical circuits, as it is a great conductor. Even other civilizations utilize its excellent electrical benefits. Even the army for the D.U.C wields blades made of pure copper, letting it surge with electricity, making it both very efficient and shocking. Though this property isn’t useful in pickaxes given its weakness.` },
        },
    },
    upgrades: {
        11: {
            title: "Copper Upgrade 1",
            description: "Double your stone gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Copper Upgrade 2",
            description: "5x Coal.",
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
            description: "Copper boosts Gold and Coal at a low rate.",
            cost: new Decimal(25),
            effect() {
                return player[this.layer].points.add(1).pow(0.2)
            },
            tooltip: "Formula: Copper+1^0.2",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() { return hasUpgrade('cu', 13) && hasUpgrade('g', 12) }
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "u", description: "U: Reset for copper", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasUpgrade('c', 22) }
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
        //if (hasUpgrade('c', 13)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    infoboxes: {
        lore: {
            title: "Layer 1: Lightness | Iron",
            body() { return `Iron on its own isn’t the best, however given how plentiful it and carbon sources like Coal are, it’s not too much of a hassle to make large quantities of steel. The Haven is said to refer to iron as an artifact of some sort. The amount of praise Iron gets is probably due to the lack of native ore in the haven. The Azure Mines is at least free from this “iron curse” given it actually has native ore.` },
        },
    },
    upgrades: {
        11: {
            title: "Iron Upgrade 1",
            description: "Triple your stone gain.",
            cost: new Decimal(1),
        },
        12: {
            title: "Iron Upgrade 2",
            description: "Triple your coal gain.",
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
            description: "Iron boosts Gold and Coal at a low rate.",
            cost: new Decimal(25),
            effect() {
                return player[this.layer].points.add(1).pow(0.2)
            },
            tooltip: "Formula: Iron+1^0.2",
            effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + "x" },
            unlocked() { return hasUpgrade('i', 13) && hasUpgrade('g', 12) }
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "i", description: "I: Reset for iron", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasUpgrade('c', 21) }
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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
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
            cost: new Decimal(100),
            unlocked() { return hasUpgrade('g', 12) }
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "g", description: "G: Reset for gold", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasUpgrade('c', 25) }
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
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "ruby", // Name of prestige currency
    baseResource: "gold", // Name of resource prestige is based on
    baseAmount() { return player.g.points }, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    infoboxes: {
        lore: {
            title: "Layer 1: Lightness | Ruby",
            body() { return `A deep-red gemstone which is only really good for cosmetic purposes. Though wizards have found beneficial usages for all of the gemstones. When a wizard is heavily influenced by the emotions inflicted by Vulcan’s rage, it is capable of soothing their anger and channeling their peace into equally powerful strength that anger would’ve provided.` },
        },
    },
    upgrades: {
        11: {
            title: "Ruby Upgrade 1",
            description: "this is unfinished so you win 🥳",
            cost: new Decimal(1),
        },
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        { key: "r", description: "R: Reset for ruby", onPress() { if (canReset(this.layer)) doReset(this.layer) } },
    ],
    layerShown() { return hasUpgrade('g', 13) }
})
