package com.adobe.aem.guides.wknd.core.servlets;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
//json imports
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;


@Component(service = Servlet.class, property = { Constants.SERVICE_DESCRIPTION + "=Search Servlet",
		"sling.servlet.methods=" + HttpConstants.METHOD_GET, "sling.servlet.paths=" + "/bin/searchdk",
		"sling.servlet.extensions=" + "json" })
public class SearchDK extends SlingAllMethodsServlet {

	private static final Logger LOGGER = org.slf4j.LoggerFactory.getLogger(SearchDK.class);
	private static final long serialVersionUID = 1L;

	@Reference
	private QueryBuilder querybuilder;

	@Override
	protected void doGet(final SlingHttpServletRequest request, final SlingHttpServletResponse response)
			throws ServletException, IOException {

		String searchPath = StringUtils.isNotBlank(request.getParameter("searchPath"))
				? request.getParameter("searchPath")
				: StringUtils.EMPTY;

		String searchTerm = StringUtils.isNotBlank(request.getParameter("searchTerm"))
				? request.getParameter("searchTerm")
				: StringUtils.EMPTY;
		LOGGER.debug("Search Path ::{}", searchPath);
		LOGGER.debug("Search Term ::{}", searchTerm);

		Map<String, String> searchPredicates = new HashMap<>();
		searchPredicates.put("path", searchPath);
		searchPredicates.put("type", "cq:Page");
		searchPredicates.put("1_property", "@jcr:content/jcr:description");
		searchPredicates.put("1_property.value", "%" + searchTerm + "%");
		searchPredicates.put("1_property.operation", "like");
		searchPredicates.put("p.limit", "-1");
		LOGGER.debug("Predicates ::{}", searchPredicates);
		Query query = querybuilder.createQuery(PredicateGroup.create(searchPredicates),
				request.getResourceResolver().adaptTo(Session.class));
		SearchResult result = query.getResult();
		LOGGER.debug("results size ::{}", result.getHits().size());
		JSONObject jObj = new JSONObject();
		JSONArray resultArray = new JSONArray();
		try {
		for (Hit hit : result.getHits()) {
				JSONObject resObj = new JSONObject();
				resObj.put("title", hit.getTitle());
				resObj.put("path", hit.getPath());
				resultArray.put(resObj);
		}
		jObj.put("results", resultArray);
		} catch (Exception e) {
				e.printStackTrace();
			}
		response.getWriter().print(jObj);
	}
}
