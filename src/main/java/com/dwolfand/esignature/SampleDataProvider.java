package com.dwolfand.esignature;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Profile;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.jdbc.datasource.init.DatabasePopulatorUtils;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;


@Component
class SampleDataProvider implements ApplicationListener<ContextRefreshedEvent>, ApplicationContextAware {

	private static final Logger LOG = LoggerFactory.getLogger(SampleDataProvider.class);
	private static final String SQL_FILE = "data.sql";

	private final DataSource dataSource;
	private ApplicationContext applicationContext;

	@Autowired
	public SampleDataProvider(DataSource dataSource) {

		LOG.info("SampleDataProvider activated!");

		Assert.notNull(dataSource, "DataSource must not be null!");
		this.dataSource = dataSource;
	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.applicationContext = applicationContext;
	}

	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {

		if (!event.getApplicationContext().equals(applicationContext)) {
			return;
		}

		LOG.info("Populating datasource using SQL file {}!", SQL_FILE);

		ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
		populator.setScripts(new Resource[] { new ClassPathResource(SQL_FILE) });
		DatabasePopulatorUtils.execute(populator, dataSource);
	}
}
