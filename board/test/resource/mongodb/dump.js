db.threads.drop();
db.threads.save({
    title : 'こんにちは',
    description : 'コン日は!A.@:;&&',
    comment : [{
        description : 'こんばんは',
        posted_by : 'o'
    }],
    posted_by : 'A'
});
db.threads.save({
    title : 'a',
    description : 'i',
    comment : [{
        description : 'u',
        posted_by : 'e'
    }],
    posted_by : 'o'
});
