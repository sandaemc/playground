import * as React from 'react';

export default class HeaderView extends React.Component<{}, {}> {
  public render() {
    return (
        <div className="m-grid m-grid--hor m-grid--root m-page" >
			<header id="m_header" className="m-grid__item m-header "  m-minimize="minimize" m-minimize-offset="200" m-minimize-mobile-offset="200" >
				<div className="m-header__top">
					<div className="m-container m-container--responsive m-container--xxl m-container--full-height m-page__container">
						<div className="m-stack m-stack--ver m-stack--desktop">
							<div className="m-stack__item m-brand">
								<div className="m-stack m-stack--ver m-stack--general m-stack--inline">
									<div className="m-stack__item m-stack__item--middle m-brand__logo">
										<a href="/" className="m-brand__logo-wrapper">
											<img alt="" src="/assets/demo/demo5/media/img/logo/logo.png"/>
										</a>
									</div>
									<div className="m-stack__item m-stack__item--middle m-brand__tools">
										<div className="m-dropdown m-dropdown--inline m-dropdown--arrow m-dropdown--align-left m-dropdown--align-push" m-dropdown-toggle="click" aria-expanded="true">
											<a href="#" className="dropdown-toggle m-dropdown__toggle btn btn-outline-metal m-btn  m-btn--icon m-btn--pill">
												<span>
													Patient Management
												</span>
											</a>
											<div className="m-dropdown__wrapper">
												<span className="m-dropdown__arrow m-dropdown__arrow--left m-dropdown__arrow--adjust"/>
												<div className="m-dropdown__inner">
													<div className="m-dropdown__body">
														<div className="m-dropdown__content">
															<ul className="m-nav">
																<li className="m-nav__section m-nav__section--first m--hide">
																	<span className="m-nav__section-text">
																		Quick Menu
																	</span>
																</li>
																<li className="m-nav__item">
																	<a href="" className="m-nav__link">
																		<i className="m-nav__link-icon flaticon-share" />
																		<span className="m-nav__link-text">
																			Patient Management
																		</span>
																	</a>
																</li>
																<li className="m-nav__item">
																	<a href="" className="m-nav__link">
																		<i className="m-nav__link-icon flaticon-chat-1" />
																		<span className="m-nav__link-text">
																			Other Management
																		</span>
																	</a>
																</li>
															</ul>
														</div>
													</div>
												</div>
											</div>
										</div>
										<a id="m_aside_header_menu_mobile_toggle" href="javascript:;" className="m-brand__icon m-brand__toggler m--visible-tablet-and-mobile-inline-block">
											<span/>
										</a>
										<a id="m_aside_header_topbar_mobile_toggle" href="javascript:;" className="m-brand__icon m--visible-tablet-and-mobile-inline-block">
											<i className="flaticon-more" />
										</a>
									</div>
								</div>
							</div>
							<div className="m-stack__item m-stack__item--fluid m-header-head" id="m_header_nav">
								<div id="m_header_topbar" className="m-topbar  m-stack m-stack--ver m-stack--general">
									<div className="m-stack__item m-topbar__nav-wrapper">
										<ul className="m-topbar__nav m-nav m-nav--inline">
											<li className="m-nav__item m-topbar__notifications m-topbar__notifications--img m-dropdown m-dropdown--large m-dropdown--header-bg-fill m-dropdown--arrow m-dropdown--align-center 	m-dropdown--mobile-full-width" m-dropdown-toggle="click" m-dropdown-persistent="1">
												<a href="#" className="m-nav__link m-dropdown__toggle" id="m_topbar_notification_icon">
													<span className="m-nav__link-badge m-badge m-badge--dot m-badge--dot-small m-badge--danger" />
													<span className="m-nav__link-icon">
														<span className="m-nav__link-icon-wrapper">
															<i className="flaticon-music-2" />
														</span>
													</span>
												</a>
												<div className="m-dropdown__wrapper">
													<span className="m-dropdown__arrow m-dropdown__arrow--center"/>
													<div className="m-dropdown__inner">
														<div className="m-dropdown__header m--align-center" style={{background:'url(/assets/demo/demo5/media/img/misc/notification_bg.jpg)', backgroundSize: 'cover',}}>
															<span className="m-dropdown__header-title">
																9 New
															</span>
															<span className="m-dropdown__header-subtitle">
																User Notifications
															</span>
														</div>
														<div className="m-dropdown__body">
															<div className="m-dropdown__content">
																<ul className="nav nav-tabs m-tabs m-tabs-line m-tabs-line--brand" role="tablist">
																	<li className="nav-item m-tabs__item">
																		<a className="nav-link m-tabs__link active" data-toggle="tab" href="#topbar_notifications_notifications" role="tab">
																			Alerts
																		</a>
																	</li>
																	<li className="nav-item m-tabs__item">
																		<a className="nav-link m-tabs__link" data-toggle="tab" href="#topbar_notifications_events" role="tab">
																			Events
																		</a>
																	</li>
																	<li className="nav-item m-tabs__item">
																		<a className="nav-link m-tabs__link" data-toggle="tab" href="#topbar_notifications_logs" role="tab">
																			Logs
																		</a>
																	</li>
																</ul>
																<div className="tab-content">
																	<div className="tab-pane active" id="topbar_notifications_notifications" role="tabpanel">
																		<div className="m-scrollable" data-scrollable="true" data-max-height="250" data-mobile-max-height="200">
																			<div className="m-list-timeline m-list-timeline--skin-light">
																				<div className="m-list-timeline__items">
																					<div className="m-list-timeline__item">
																						<span className="m-list-timeline__badge -m-list-timeline__badge--state-success" />
																						<span className="m-list-timeline__text">
																							12 new users registered
																						</span>
																						<span className="m-list-timeline__time">
																							Just now
																						</span>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																	<div className="tab-pane" id="topbar_notifications_events" role="tabpanel">
																		<div className="m-scrollable" data-scrollable="true" data-max-height="250" data-mobile-max-height="200">
																			<div className="m-list-timeline m-list-timeline--skin-light">
																				<div className="m-list-timeline__items">
																					<div className="m-list-timeline__item">
																						<span className="m-list-timeline__badge m-list-timeline__badge--state1-success" />
																						<a href="" className="m-list-timeline__text">
																							New debt payment received
																						</a>
																						<span className="m-list-timeline__time">
																							Just now
																						</span>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																	<div className="tab-pane" id="topbar_notifications_logs" role="tabpanel">
																		<div className="m-stack m-stack--ver m-stack--general" style={{minHeight: '180px'}}>
																			<div className="m-stack__item m-stack__item--center m-stack__item--middle">
																				<span className="">
																					All caught up!
																					<br/>
																					No new logs.
																				</span>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</li>
											
											<li className="m-nav__item m-topbar__user-profile m-topbar__user-profile--img  m-dropdown m-dropdown--medium m-dropdown--arrow m-dropdown--header-bg-fill m-dropdown--align-right m-dropdown--mobile-full-width m-dropdown--skin-light" m-dropdown-toggle="click">
												<a href="#" className="m-nav__link m-dropdown__toggle">
													<span className="m-topbar__welcome">
														Hello,&nbsp;
													</span>
													<span className="m-topbar__username">
														Karen
													</span>
													<span className="m-topbar__userpic">
														<img src="/assets/demo/demo5/media/img/users/user5.jpg" className="m--img-rounded m--marginless m--img-centered" alt=""/>
													</span>
												</a>
												<div className="m-dropdown__wrapper">
													<span className="m-dropdown__arrow m-dropdown__arrow--right m-dropdown__arrow--adjust" />
													<div className="m-dropdown__inner">
														<div className="m-dropdown__header m--align-center" style={{background: 'url(/assets/demo/demo5/media/img/misc/user_profile_bg.jpg)', backgroundSize: 'cover'}}>
															<div className="m-card-user m-card-user--skin-dark">
																<div className="m-card-user__pic">
																	<img src="/assets/demo/demo5/media/img/users/user5.jpg" className="m--img-rounded m--marginless" alt=""/>
																</div>
																<div className="m-card-user__details">
																	<span className="m-card-user__name m--font-weight-500">
																		Karen Palana
																	</span>
																	<a href="" className="m-card-user__email m--font-weight-300 m-link">
																		Administrator
																	</a>
																</div>
															</div>
														</div>
														<div className="m-dropdown__body">
															<div className="m-dropdown__content">
																<ul className="m-nav m-nav--skin-light">
																	<li className="m-nav__section m--hide">
																		<span className="m-nav__section-text">
																			Section
																		</span>
																	</li>
																	<li className="m-nav__item">
																		<a href="profile.html" className="m-nav__link">
																			<i className="m-nav__link-icon flaticon-profile-1" />
																			<span className="m-nav__link-title">
																				<span className="m-nav__link-wrap">
																					<span className="m-nav__link-text">
																						My Profile
																					</span>
																					<span className="m-nav__link-badge">
																						<span className="m-badge m-badge--success">
																							2
																						</span>
																					</span>
																				</span>
																			</span>
																		</a>
																	</li>
																	<li className="m-nav__item">
																		<a href="profile.html" className="m-nav__link">
																			<i className="m-nav__link-icon flaticon-chat-1" />
																			<span className="m-nav__link-text">
																				Messages
																			</span>
																		</a>
																	</li>
																	<li className="m-nav__separator m-nav__separator--fit" />
																	<li className="m-nav__item">
																		<a href="snippets/pages/user/login-1.html" className="btn m-btn--pill btn-secondary m-btn m-btn--custom m-btn--label-brand m-btn--bolder">
																			Logout
																		</a>
																	</li>
																</ul>
															</div>
														</div>
													</div>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="m-header__bottom">
					<div className="m-container m-container--responsive m-container--xxl m-container--full-height m-page__container">
						<div className="m-stack m-stack--ver m-stack--desktop">
							<div className="m-stack__item m-stack__item--middle m-stack__item--fluid">
								<button className="m-aside-header-menu-mobile-close  m-aside-header-menu-mobile-close--skin-light " id="m_aside_header_menu_mobile_close_btn">
									<i className="la la-close" />
								</button>
								<div id="m_header_menu" className="m-header-menu m-aside-header-menu-mobile m-aside-header-menu-mobile--offcanvas  m-header-menu--skin-dark m-header-menu--submenu-skin-light m-aside-header-menu-mobile--skin-light m-aside-header-menu-mobile--submenu-skin-light "  >
									<ul className="m-menu__nav  m-menu__nav--submenu-arrow ">
										<li className="m-menu__item  m-menu__item--active "  aria-haspopup="true">
											<a  href="/" className="m-menu__link ">
											{/* BEGIN: Identifier This needs logic to toggle its position if you click Reports or Dashboard */}
												<span className="m-menu__item-here" />
											{/* END: Identifier  */}
												<span className="m-menu__link-text">
													Dashboard
												</span>
											</a>
										</li>
										<li className="m-menu__item  m-menu__item--submenu m-menu__item--rel"  m-menu-submenu-toggle="click" m-menu-link-redirect="1" aria-haspopup="true">
											<a  href="javascript:;" className="m-menu__link m-menu__toggle">
												<span className="m-menu__item-here"/>
												<span className="m-menu__link-text">
													Actions
												</span>
												<i className="m-menu__hor-arrow la la-angle-down"/>
												<i className="m-menu__ver-arrow la la-angle-right"/>
											</a>
											<div className="m-menu__submenu  m-menu__submenu--fixed m-menu__submenu--left" style={{width:"300px"}}>
												<span className="m-menu__arrow m-menu__arrow--adjust"/>
												<ul className="m-menu__subnav">
													<li className="m-menu__item">
														<a href="/patients/new" className="m-menu__link">
															<i className="m-menu__link-icon flaticon-plus" />
															<span className="m-menu__link-title">
																<span className="m-menu__link-wrap">
																	<span className="m-menu__link-text">Add A New Patient</span>
																</span>
															</span>
														</a>
													</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>
							</div>
							<div className="m-stack__item m-stack__item--middle m-dropdown m-dropdown--arrow m-dropdown--large m-dropdown--mobile-full-width m-dropdown--align-right m-dropdown--skin-light m-header-search m-header-search--expandable m-header-search--skin-" id="m_quicksearch" m-quicksearch-mode="default">
								<form className="m-header-search__form">
									<div className="m-header-search__wrapper">
										<span className="m-header-search__icon-search" id="m_quicksearch_search">
											<i className="la la-search"/>
										</span>
										<span className="m-header-search__input-wrapper">
											<input autoComplete="off" type="text" name="q" className="m-header-search__input" placeholder="Search..." id="m_quicksearch_input" />
										</span>
										<span className="m-header-search__icon-close" id="m_quicksearch_close">
											<i className="la la-remove"/>
										</span>
										<span className="m-header-search__icon-cancel" id="m_quicksearch_cancel">
											<i className="la la-remove"/>
										</span>
									</div>
								</form>
								<div className="m-dropdown__wrapper">
									<div className="m-dropdown__arrow m-dropdown__arrow--center"/>
									<div className="m-dropdown__inner">
										<div className="m-dropdown__body">
											<div className="m-dropdown__scrollable m-scrollable" data-scrollable="true"  data-max-height="300" data-mobile-max-height="200">
												<div className="m-dropdown__content m-list-search m-list-search--skin-light"/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
            </div>
    );
  }
}
