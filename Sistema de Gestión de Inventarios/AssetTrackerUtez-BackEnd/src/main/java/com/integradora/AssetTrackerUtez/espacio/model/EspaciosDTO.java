package com.integradora.AssetTrackerUtez.espacio.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
public class EspaciosDTO {

    @NotNull(groups = {Modify.class, ChangeStatus.class},message = "Es necesario el id")
    private int id;

    @NotBlank(groups = {Modify.class, Register.class}, message = "Es necesario el nombre")
    private String nombre;

    @NotBlank(groups = {Modify.class, Register.class}, message = "Es necesario el numero de planta")
    private Integer numeroPlanta;
    //la validacion solo funciona al registar un nuevo espacio
    @NotBlank(groups = { Register.class}, message = "Es necesario la url de la imagen")
    private String urlImagen;

    @NotBlank(groups = { Register.class}, message = "Es necesario el public id de la imagen")
    private String publicId;

    @NotNull(groups = {Register.class, Modify.class}, message = "Es necesario el id del edificio")
    private Long idEdificio;

    public Long getIdEdificio() {
        return idEdificio;
    }

    public void setIdEdificio(Long idEdificio) {
        this.idEdificio = idEdificio;
    }

    public int getId() {
        return id;
    }

    public String getPublicId() {
        return publicId;
    }

    public void setPublicId(String publicId) {
        this.publicId = publicId;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getNumeroPlanta() {
        return numeroPlanta;
    }

    public void setNumeroPlanta(Integer numeroPlanta) {
        this.numeroPlanta = numeroPlanta;
    }

    public String getUrlImagen() {
        return urlImagen;
    }

    public void setUrlImagen(String urlImagen) {
        this.urlImagen = urlImagen;
    }

    public interface Register {
    }

    public interface Modify {
    }

    public interface ChangeStatus {
    }
}
