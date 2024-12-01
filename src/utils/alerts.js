import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export const PedidoLab = () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Pedido de Laboratorio?",
        text: "Desea agregar un pedido de laboratorio a la evolucion clinica?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            navigate("/Evolution/LaboratoryOrder")
        } else if(result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Pedido de laboratorio cancelado",
                text: "No se agregaran pedidos de laboratorio",
                icon: "success"
            });
        }
    });

}
export const Receta = () => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Receta Digital",
        text: "Desea agregar una receta digital a la evolucion clinca?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            navigate("/Evolution/DigitalPrescription")
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Receta digital cancelada",
                text: "No se agregaran receas digitales",
                icon: "success"
            });
        }
    });
}