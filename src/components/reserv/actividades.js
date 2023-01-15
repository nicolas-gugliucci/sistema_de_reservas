
//-------------------------------RESERVA PASO ACTIVIDADES (ACTIVO E INACTIVO)-----------------------------------
function chequear_dia(){
    dia = (document.querySelector(".btn-check:checked")).id;
    dia_completo = document.querySelector(`label[for=${dia}]`).innerHTML.toLowerCase();
    const dia_completo_date = DateTime.fromFormat(`${dia_completo}`, "EEEE' 'dd'/'LL", {locale: 'es-ES'});
    dia_completo = dia_completo_date.toFormat("EEEE' 'dd'/'LL");
    const div_actividades_diarias = document.getElementById('div_actividades_diarias');
    let i = 0;
    console.log('chekdia')

    console.log(actividades)

    div_actividades_diarias.innerHTML='';
    actividades_por_dia(dia).forEach((actividad) => {
        const div_form = document.createElement('div');
        div_form.setAttribute("class", "form-check");
        div_form.style.marginLeft = "10px";
        const obj_actividad = actividades_del_socio.find((acti) => acti.nombre == (actividad[0].toUpperCase() + actividad.substring(1)));
        const indice = actividades_del_socio.indexOf(obj_actividad);
        if (actividades_del_socio[indice][dia].activo){
            if (i==0){
                div_form.innerHTML = `
                    <input class="form-check-input actividades_form" type="radio" name="actividades" id="${removeAccents(actividad.toLocaleLowerCase())}" checked>
                    <label class="form-check-label" for="${removeAccents(actividad.toLocaleLowerCase())}">
                        ${actividad}
                    </label>`;
                i++;
            }else{
                div_form.innerHTML = `
                    <input class="form-check-input actividades_form" type="radio" name="actividades" id="${removeAccents(actividad.toLocaleLowerCase())}">
                    <label class="form-check-label" for="${removeAccents(actividad.toLocaleLowerCase())}">
                        ${actividad}
                    </label>`;
            };
        }else{
            div_form.innerHTML = `
                <input class="form-check-input actividades_form" type="radio" name="actividades" id="${removeAccents(actividad.toLocaleLowerCase())}" disabled>
                <label class="form-check-label" for="${removeAccents(actividad.toLocaleLowerCase())}">
                    ${actividad}
                </label>`;
        };
        div_actividades_diarias.append(div_form);
        const div_horarios = document.createElement('div');
        div_horarios.setAttribute("id", `horarios_${removeAccents(actividad.toLocaleLowerCase())}`);
        div_horarios.style.marginLeft = "35px";
        div_horarios.innerHTML='';
        div_actividades_diarias.append(div_horarios);
    });
    horario_nuevo = undefined;
    chequear_actividad();
    div_actividades_diarias.addEventListener('change', chequear_actividad);
};
