/*
 * Copyright 2012 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.dwolfand.esignature.pojo;

import javax.persistence.Column;
import javax.persistence.Entity;


@Entity
public class Signature extends AbstractEntity {


	@Column(unique=true)
	private String name;
	
	@Column(length=60000)
	private String signature;


	public Signature(String name, String signature) {
		this.name = name;
		this.signature = signature;
	}

	protected Signature() {

	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	public String getSignature() {
		return signature;
	}

	public void setSignature(String signature) {
		this.signature = signature;
	}
	

}
