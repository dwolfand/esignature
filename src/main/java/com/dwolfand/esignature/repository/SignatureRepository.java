package com.dwolfand.esignature.repository;

import org.springframework.data.repository.CrudRepository;

import com.dwolfand.esignature.pojo.Signature;


public interface SignatureRepository extends CrudRepository<Signature, Long> {

}
