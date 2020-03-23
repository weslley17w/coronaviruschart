let datecorona = [];
function dateToString(d) {
    return [d.getMonth() + 1, d.getDate(), d.getFullYear() - 2000].join('/');
}
function CalcularData(date){
    var date1 = new Date("1/22/2020");
    var timeDiff = Math.abs(date.getTime() - date1.getTime());
    diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return (diffDays -1);
}

var dias = CalcularData(new Date());
var hoje = new Date();
var ano = hoje.getFullYear();
var mes = hoje.getMonth();
var dia = hoje.getDate();
for (var i = -dias; i <= 0; i++) {
    var outroDia = new Date(ano, mes, dia + i);
    datecorona.push(dateToString(outroDia));
}