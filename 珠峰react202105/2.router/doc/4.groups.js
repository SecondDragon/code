console.log(/(?<x>\d{2})-(?<y>\d{2})/.exec('11-22'));

console.log('11-22'.replace(/(?<x>\d{2})-(?<y>\d{2})/,"$<y>-$<x>"));