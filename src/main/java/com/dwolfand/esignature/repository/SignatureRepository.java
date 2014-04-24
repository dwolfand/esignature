package com.dwolfand.esignature.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.dwolfand.esignature.pojo.Signature;


public interface SignatureRepository extends CrudRepository<Signature, Long> {
	
	/**
	 * Returns the signature card with the given {@link Name}.
	 * 
	 * @param name the {@link Name} to search for.
	 * @return
	 */
	Signature findByName(@Param("name") String name);

}
