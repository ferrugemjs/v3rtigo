define(["exports","incremental-dom","./connect-provider"], function (exports,_idom,_connect_provider){
	var __connect_provider_tmp = Object.keys(_connect_provider)[0];
	exports.default = (function(super_clazz){
		function _clazz_sub_f_a44f16a5_a594_4b67_9980_cabf58177329_tmp(props){
			if(super_clazz.call){
				super_clazz.call(this, props);
			}
		};
		_clazz_sub_f_a44f16a5_a594_4b67_9980_cabf58177329_tmp.prototype = Object.create(super_clazz.prototype || super_clazz);
		_clazz_sub_f_a44f16a5_a594_4b67_9980_cabf58177329_tmp.prototype.constructor = _clazz_sub_f_a44f16a5_a594_4b67_9980_cabf58177329_tmp;
		_clazz_sub_f_a44f16a5_a594_4b67_9980_cabf58177329_tmp.prototype.$render = function(config_props){if(!config_props.loaded){ _idom.elementOpen("div",""+(config_props.key_id)+"",["class","connect-provider"],"is",(config_props.is),"id",(config_props.key_id));

	
};					
this.$content();
		if(!config_props.loaded){_idom.elementClose("div");};	};
		return _clazz_sub_f_a44f16a5_a594_4b67_9980_cabf58177329_tmp;
	})(_connect_provider[__connect_provider_tmp] || _connect_provider);
});