package com.newtouch.lion.admin.web.controller.code;

import com.newtouch.lion.admin.web.model.code.*;
import com.newtouch.lion.model.system.CodeList;
import com.newtouch.lion.page.PageResult;
import com.newtouch.lion.query.QueryCriteria;
import com.newtouch.lion.service.system.CodeListService;
import com.newtouch.lion.web.page.Page;
import com.newtouch.lion.web.util.QueryUtils;
import com.newtouch.lion.webtrans.trans.Trans;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2016/4/15.
 */
@Controller
public class CodeListController {
    @Autowired
    private CodeListService codeListService;

    //编码列表
    @Trans("system.codelist.list")
    public Page<CodeList> list(CodeListGetReq req){
        //排序
        QueryCriteria queryCriteria = QueryUtils.pageFormat(new QueryCriteria(),req);

        //查询
        if (org.apache.commons.lang.StringUtils.isNotEmpty(req.getNameZh())) {
            queryCriteria.addQueryCondition("NameZh","%"+req.getNameZh()+"%");
        }

        PageResult<CodeList> pageResult = codeListService.doFindByCriteria(queryCriteria);
        List<CodeListGetResp> list = new ArrayList<CodeListGetResp>();

        for (CodeList codeList : pageResult.getContent()){
            CodeListGetResp codeListGetResp = new CodeListGetResp();
            BeanUtils.copyProperties(codeList,codeListGetResp);

            list.add(codeListGetResp);
        }
        PageResult<CodeListGetResp> pageResult1 = new PageResult<CodeListGetResp>();
        BeanUtils.copyProperties(pageResult,pageResult1);
        pageResult1.setContent(list);

        return new Page(pageResult1);
    }

    /**
     * 编码添加
     * */
    @Trans("system.codelist.add")
    public CodeListAddResp add(CodeListAddReq req){
        CodeList codeList = new CodeList();
        BeanUtils.copyProperties(req,codeList);
        codeListService.doCreate(codeList);
        return new CodeListAddResp(CodeListAddResp.SUCCESS_CODELIST_ADD_CODE,CodeListAddResp.SUCCESS_CODELIST_ADD_MESSAGE);
    }

    /**
     * 编码编辑
     * */
    @Trans("system.codelist.edit")
    public CodeListEditResp edit(CodeListEditReq req){
        CodeList codeList = codeListService.doFindById(req.getId());
        if (codeList == null){
            return new CodeListEditResp(CodeListEditResp.FAIL_CODELIST_EDIT_CODE,CodeListEditResp.FAIL_CODELIST_EDIT_MESSAGE);
        }
        BeanUtils.copyProperties(req,codeList);
        codeListService.doUpdateObj(codeList);
        return new CodeListEditResp(CodeListEditResp.SUCCESS_CODELIST_EDIT_CODE,CodeListEditResp.SUCCESS_CODELIST_EDIT_MESSAGE);
    }

    /**
     * 编码删除
     * */
    @Trans("system.codelist.delete")
    public CodeListDelResp delete(CodeListDelReq req){
        int updateRow = this.codeListService.doDeleteByIds(req.getIds());
//        Map<String,String> map = new HashMap<String, String>();
//        int updateRow = this.codeListService.doDeleteById(req.getId());
        if (updateRow > 0){
            return new CodeListDelResp(CodeListDelResp.SUCCESS_CODELIST_DELETE_CODE,CodeListDelResp.SUCCESS_CODELIST_DELETE_MESSAGE);
        }else {
            return new CodeListDelResp(CodeListDelResp.FAIL_CODELIST_DELETE_CODE,CodeListDelResp.FAIL_CODELIST_DELETE_MESSAGE);
        }
//        ModelAndView.addObject();
//        return this.

    }
}
